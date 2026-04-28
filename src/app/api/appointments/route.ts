import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { getAppointmentsContainer, isCosmosConfigured } from "@/lib/cosmos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function checkAuth(req: Request): boolean {
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) return false;
  const provided =
    req.headers.get("x-admin-key") ||
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    "";
  if (!provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!isCosmosConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Storage not configured" },
      { status: 503 }
    );
  }

  const container = getAppointmentsContainer();
  if (!container) {
    return NextResponse.json(
      { ok: false, error: "Storage not configured" },
      { status: 503 }
    );
  }

  const url = new URL(req.url);
  const limit = Math.min(
    Math.max(parseInt(url.searchParams.get("limit") || "100", 10) || 100, 1),
    500
  );
  const status = url.searchParams.get("status");

  try {
    const query = status
      ? {
          query:
            "SELECT TOP @limit * FROM c WHERE c.status = @status ORDER BY c.createdAt DESC",
          parameters: [
            { name: "@limit", value: limit },
            { name: "@status", value: status },
          ],
        }
      : {
          query: "SELECT TOP @limit * FROM c ORDER BY c.createdAt DESC",
          parameters: [{ name: "@limit", value: limit }],
        };

    const { resources } = await container.items.query(query).fetchAll();
    return NextResponse.json({ ok: true, count: resources.length, items: resources });
  } catch (err) {
    console.error("[appointments] query failed:", err);
    return NextResponse.json({ ok: false, error: "Query failed" }, { status: 500 });
  }
}

interface PatchPayload {
  id?: string;
  status?: string;
}

export async function PATCH(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const container = getAppointmentsContainer();
  if (!container) {
    return NextResponse.json(
      { ok: false, error: "Storage not configured" },
      { status: 503 }
    );
  }
  let body: PatchPayload;
  try {
    body = (await req.json()) as PatchPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const id = typeof body.id === "string" ? body.id : "";
  const newStatus = typeof body.status === "string" ? body.status : "";
  const allowed = ["new", "contacted", "confirmed", "cancelled"];
  if (!id || !allowed.includes(newStatus)) {
    return NextResponse.json({ ok: false, error: "Invalid id or status" }, { status: 400 });
  }

  try {
    const { resources } = await container.items
      .query({
        query: "SELECT * FROM c WHERE c.id = @id",
        parameters: [{ name: "@id", value: id }],
      })
      .fetchAll();
    const existing = resources[0];
    if (!existing) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }
    // status is the partition key; delete from old partition and recreate in new.
    await container.item(id, existing.status).delete();
    const updated = {
      ...existing,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
    await container.items.create(updated);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[appointments] patch failed:", err);
    return NextResponse.json({ ok: false, error: "Update failed" }, { status: 500 });
  }
}
