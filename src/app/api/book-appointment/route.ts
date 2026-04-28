import { NextResponse } from "next/server";
import { randomUUID, createHash } from "crypto";
import { getAppointmentsContainer, isCosmosConfigured } from "@/lib/cosmos";

export const runtime = "nodejs";

interface BookingPayload {
  name?: string;
  phone?: string;
  email?: string;
  date?: string;
  time?: string;
  service?: string;
  message?: string;
}

function sanitize(value: unknown, max = 200): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `+91${digits.slice(1)}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  return digits.startsWith("+") ? digits : `+${digits}`;
}

// Simple in-memory rate limit (per warm instance). Best-effort, not a security boundary.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const hits = new Map<string, number[]>();

function rateLimit(key: string): boolean {
  const now = Date.now();
  const arr = (hits.get(key) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (arr.length >= RATE_LIMIT_MAX) {
    hits.set(key, arr);
    return false;
  }
  arr.push(now);
  hits.set(key, arr);
  return true;
}

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  let payload: BookingPayload;
  try {
    payload = (await req.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = sanitize(payload.name, 80);
  const phoneRaw = sanitize(payload.phone, 30);
  const email = sanitize(payload.email, 120);
  const date = sanitize(payload.date, 30);
  const time = sanitize(payload.time, 30);
  const service = sanitize(payload.service, 120);
  const message = sanitize(payload.message, 500);

  if (!name || !phoneRaw || !date) {
    return NextResponse.json(
      { ok: false, error: "Name, phone and date are required." },
      { status: 400 }
    );
  }

  const phone = normalizePhone(phoneRaw);
  if (!/^\+\d{10,15}$/.test(phone)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid phone number." },
      { status: 400 }
    );
  }

  const ip = clientIp(req);
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  if (!isCosmosConfigured()) {
    console.warn("[book-appointment] Cosmos DB not configured (COSMOS_ENDPOINT / COSMOS_KEY).");
    return NextResponse.json(
      { ok: false, error: "Booking service is temporarily unavailable. Please call us." },
      { status: 503 }
    );
  }

  const container = getAppointmentsContainer();
  if (!container) {
    return NextResponse.json(
      { ok: false, error: "Booking service is temporarily unavailable. Please call us." },
      { status: 503 }
    );
  }

  const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 32);
  const doc = {
    id: randomUUID(),
    status: "new" as const,
    name,
    phone,
    email: email || null,
    preferredDate: date,
    preferredTime: time || null,
    service: service || null,
    message: message || null,
    createdAt: new Date().toISOString(),
    source: "website",
    userAgent: req.headers.get("user-agent")?.slice(0, 300) || null,
    ipHash,
  };

  try {
    await container.items.create(doc);
  } catch (err) {
    console.error("[book-appointment] Cosmos write failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not save your request. Please try again or call us." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, id: doc.id });
}
