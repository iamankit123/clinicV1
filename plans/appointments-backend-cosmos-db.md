# Appointments Backend on Azure (Cosmos DB)

> Persist every appointment request from the website into Azure Cosmos DB. No SMS, no email — just durable storage that the clinic (and admin UI) can query.

---

## 1. Goal

Replace the SMS step with permanent storage so:

- Every form submission on `/book-appointment` is saved to a database.
- The clinic can later view, search, export, and act on bookings.
- The whole stack stays on Azure free tier (zero monthly cost).
- Adding notifications (email / WhatsApp / SMS) later is additive, not a rewrite.

## 2. Architecture

```
Browser ──POST /api/book-appointment──► Next.js API route (Azure App Service)
                                                │
                                                ▼
                                     Azure Cosmos DB for NoSQL
                                  (Free tier: 1000 RU/s + 25 GB, forever)
```

## 3. Data Model

Container `appointments`, partition key `/status`.

```json
{
  "id": "uuid",
  "status": "new",
  "name": "...",
  "phone": "+91...",
  "email": "...",
  "preferredDate": "2026-05-05",
  "preferredTime": "10:00-12:00",
  "service": "...",
  "message": "...",
  "createdAt": "ISO timestamp",
  "source": "website",
  "userAgent": "...",
  "ipHash": "..."
}
```

Status values: `new`, `contacted`, `confirmed`, `cancelled`.

## 4. Azure Setup (one-time)

1. Cosmos DB account `clinic-bookings-db` (NoSQL API, **free tier applied**).
2. Database `clinic`, container `appointments`, partition key `/status`, 400 RU/s manual.
3. App Service env vars: `COSMOS_ENDPOINT`, `COSMOS_KEY`, `COSMOS_DATABASE`, `COSMOS_CONTAINER`, `ADMIN_API_KEY`.

## 5. Code

- `src/lib/cosmos.ts` — lazy-init Cosmos client.
- `src/app/api/book-appointment/route.ts` — `POST` validates, sanitizes, rate-limits, writes to Cosmos.
- `src/app/api/appointments/route.ts` — `GET` (list, admin-only) and `PATCH` (update status, admin-only). Auth via `x-admin-key` header, constant-time compared to `ADMIN_API_KEY`.
- `src/app/admin/page.tsx` — receptionist login + table UI (filter, refresh, CSV export, status updates).

## 6. Receptionist Access

- URL: `https://<your-site>/admin`
- Sign-in: paste `ADMIN_API_KEY` value once; browser remembers via `localStorage`.
- Actions: filter by status, refresh, change a booking's status (`new` → `contacted` → `confirmed` / `cancelled`), export CSV.

## 7. Cost

- Cosmos free tier: 1000 RU/s + 25 GB free per Azure account, forever.
- One booking write ≈ 5–10 RU. Thousands per day fit comfortably.

## 8. Future Work

- Email notification on new booking (Resend free tier).
- Search by name/phone in the admin UI.
- Magic-link auth for staff instead of a static key.
