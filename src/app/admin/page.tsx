"use client";

import { useEffect, useState, useCallback } from "react";

interface Appointment {
  id: string;
  status: "new" | "contacted" | "confirmed" | "cancelled";
  name: string;
  phone: string;
  email: string | null;
  preferredDate: string;
  preferredTime: string | null;
  service: string | null;
  message: string | null;
  createdAt: string;
}

const STORAGE_KEY = "clinic_admin_key";
const STATUSES: Appointment["status"][] = [
  "new",
  "contacted",
  "confirmed",
  "cancelled",
];

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState<string>("");
  const [keyInput, setKeyInput] = useState<string>("");
  const [items, setItems] = useState<Appointment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem(STORAGE_KEY) || "";
      if (saved) setAdminKey(saved);
    }
  }, []);

  const fetchItems = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true);
    setError(null);
    try {
      const qs = statusFilter ? `?status=${encodeURIComponent(statusFilter)}` : "";
      const res = await fetch(`/api/appointments${qs}`, {
        headers: { "x-admin-key": adminKey },
        cache: "no-store",
      });
      if (res.status === 401) {
        setError("Wrong access key. Please log in again.");
        setAdminKey("");
        if (typeof window !== "undefined")
          window.localStorage.removeItem(STORAGE_KEY);
        return;
      }
      const json = (await res.json()) as {
        ok: boolean;
        items?: Appointment[];
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setError(json.error || "Failed to load appointments.");
        return;
      }
      setItems(json.items || []);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [adminKey, statusFilter]);

  useEffect(() => {
    if (adminKey) fetchItems();
  }, [adminKey, fetchItems]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!keyInput.trim()) return;
    const k = keyInput.trim();
    setAdminKey(k);
    if (typeof window !== "undefined")
      window.localStorage.setItem(STORAGE_KEY, k);
    setKeyInput("");
  }

  function handleLogout() {
    setAdminKey("");
    setItems(null);
    if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
  }

  async function updateStatus(id: string, status: Appointment["status"]) {
    if (!adminKey) return;
    try {
      const res = await fetch("/api/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-key": adminKey },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setError(j.error || "Failed to update status.");
        return;
      }
      await fetchItems();
    } catch {
      setError("Network error while updating.");
    }
  }

  function exportCsv() {
    if (!items || items.length === 0) return;
    const headers = [
      "createdAt",
      "status",
      "name",
      "phone",
      "email",
      "preferredDate",
      "preferredTime",
      "service",
      "message",
    ];
    const escape = (v: unknown) => {
      const s = v == null ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const lines = [
      headers.join(","),
      ...items.map((it) =>
        headers
          .map((h) => escape((it as unknown as Record<string, unknown>)[h]))
          .join(",")
      ),
    ];
    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointments-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (!adminKey) {
    return (
      <section className="flex min-h-screen items-center bg-cream-50 px-6 py-24">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-cream-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold tracking-[0.25em] text-gold-500 uppercase">
            Staff Only
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-charcoal-800">
            Reception Login
          </h1>
          <p className="mt-3 text-sm text-charcoal-400">
            Enter your access key to view appointment requests.
          </p>
          {error && (
            <p className="mt-4 rounded-lg border border-burgundy-200 bg-burgundy-50 px-3 py-2 text-sm text-burgundy-700">
              {error}
            </p>
          )}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              type="password"
              autoFocus
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Access key"
              className="block w-full rounded-xl border border-cream-200 bg-cream-50 px-4 py-3 text-sm text-charcoal-800 outline-none focus:border-burgundy-300 focus:ring-2 focus:ring-burgundy-100"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-burgundy-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-burgundy-700"
            >
              Sign in
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-cream-50 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] text-gold-500 uppercase">
              Reception
            </p>
            <h1 className="mt-1 font-serif text-3xl font-semibold text-charcoal-800">
              Appointment Requests
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-full border border-cream-200 bg-white px-4 py-2 text-sm text-charcoal-700"
            >
              <option value="">All statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              onClick={fetchItems}
              className="rounded-full border border-cream-200 bg-white px-4 py-2 text-sm font-semibold text-charcoal-700 hover:border-burgundy-200 hover:text-burgundy-600"
            >
              Refresh
            </button>
            <button
              onClick={exportCsv}
              disabled={!items || items.length === 0}
              className="rounded-full border border-cream-200 bg-white px-4 py-2 text-sm font-semibold text-charcoal-700 hover:border-burgundy-200 hover:text-burgundy-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="rounded-full bg-charcoal-800 px-4 py-2 text-sm font-semibold text-white hover:bg-charcoal-700"
            >
              Sign out
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-6 rounded-lg border border-burgundy-200 bg-burgundy-50 px-4 py-3 text-sm text-burgundy-700">
            {error}
          </p>
        )}

        <div className="mt-8 overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm">
          {loading ? (
            <p className="px-6 py-10 text-center text-sm text-charcoal-400">
              Loading…
            </p>
          ) : !items ? (
            <p className="px-6 py-10 text-center text-sm text-charcoal-400">
              No data yet.
            </p>
          ) : items.length === 0 ? (
            <p className="px-6 py-10 text-center text-sm text-charcoal-400">
              No appointment requests
              {statusFilter ? ` with status "${statusFilter}"` : " yet"}.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-cream-100 text-xs font-semibold uppercase tracking-wide text-charcoal-600">
                  <tr>
                    <th className="px-4 py-3">Received</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Preferred</th>
                    <th className="px-4 py-3">Service</th>
                    <th className="px-4 py-3">Notes</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-200 text-charcoal-700">
                  {items.map((it) => (
                    <tr key={it.id} className="align-top hover:bg-cream-50/60">
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-charcoal-500">
                        {new Date(it.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td className="px-4 py-3 font-semibold">{it.name}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <a
                          href={`tel:${it.phone}`}
                          className="text-burgundy-600 hover:underline"
                        >
                          {it.phone}
                        </a>
                        {it.email && (
                          <div className="text-xs text-charcoal-400">
                            {it.email}
                          </div>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {it.preferredDate}
                        {it.preferredTime && (
                          <div className="text-xs text-charcoal-400">
                            {it.preferredTime}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">{it.service || "—"}</td>
                      <td className="px-4 py-3 text-xs text-charcoal-500">
                        {it.message || "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <select
                          value={it.status}
                          onChange={(e) =>
                            updateStatus(
                              it.id,
                              e.target.value as Appointment["status"]
                            )
                          }
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                            it.status === "new"
                              ? "border-burgundy-200 bg-burgundy-50 text-burgundy-700"
                              : it.status === "contacted"
                                ? "border-gold-200 bg-gold-50 text-gold-700"
                                : it.status === "confirmed"
                                  ? "border-green-200 bg-green-50 text-green-700"
                                  : "border-cream-200 bg-cream-50 text-charcoal-500"
                          }`}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="mt-6 text-xs text-charcoal-400">
          {items?.length ?? 0} record{(items?.length ?? 0) === 1 ? "" : "s"} loaded.
        </p>
      </div>
    </section>
  );
}
