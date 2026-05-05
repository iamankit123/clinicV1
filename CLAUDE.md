# CLAUDE.md — Dr. Shivani Clinic Website

Auto-loaded by Claude Code at the start of every session in this project.

## Read This First

**[STATUS.md](STATUS.md)** — Current project state, recent changes, open issues. Read it at the start of every session before doing anything else.

---

## Project

Next.js 16 clinic website for Dr. Shivani Singh (dental + skin + aesthetics), Delhi.

| | |
|---|---|
| Live URL | https://drshivanisingh.com |
| Azure URL | https://clinic-website-v1-web-c6c8asakhpcahcam.centralindia-01.azurewebsites.net |
| GitHub | https://github.com/iamankit123/clinicV1 |
| Deploy | Push to `main` → GitHub Actions → Azure App Service (Central India, Node 20) |
| Startup | `node server.js` (Next.js standalone output) |

---

## Critical Rules

1. **Never remove the zip step** in `.github/workflows/main_clinic-website-v1-web.yml`.
   `upload-artifact` silently drops hidden directories (`.next`) from raw folder paths.
   Without `zip -r ../../deploy.zip .`, Azure shows "Could not find production build" error.

2. **All clinic data lives in `src/lib/constants.ts`**.
   Never hardcode addresses, phones, hours, or services in page files.

3. **Never commit** `node_modules/`, `.next/`, `screenshots/`, `*.js` debug scripts in project root, or a file named `nul` (Windows reserved device name — crashes Turbopack).

4. **Cosmos DB is not configured.** The booking API logs appointments to console and returns `ok:true`. This is intentional — do not add error handling that breaks the form.

---

## Key Files

| File | Purpose |
|------|---------|
| `src/lib/constants.ts` | ALL clinic data — single source of truth |
| `src/app/page.tsx` | Home page — hero, gallery, testimonials, CTA |
| `src/app/book-appointment/page.tsx` | Appointment booking form |
| `src/app/admin/page.tsx` | Internal appointments viewer |
| `src/app/api/book-appointment/route.ts` | Booking API — Cosmos optional |
| `.github/workflows/main_clinic-website-v1-web.yml` | CI/CD — contains critical zip step |
| `src/app/globals.css` | Tailwind v4 theme tokens, animation, utility classes |

---

## Skills

These slash commands are available in this project (`.claude/commands/`):

| Command | What it does |
|---------|-------------|
| `/dev` | Build, deploy, status check, local setup |
| `/content` | Update constants.ts — address, testimonials, services, bio |
| `/test` | Full functional Playwright test — every button, form, flow |
| `/ux-review` | Visual review as Product Designer / Senior PM / CEO |
| `/portal` | Open Azure portal or GoDaddy in Chrome, waits at login |
| `/debug` | Diagnose production issues — Azure errors, DNS, failed deploys |

---

## STATUS.md Update Rule

After every work session:
1. Prepend a new entry to `STATUS.md` with timestamp `[YYYY-MM-DD HH:MM]` and 2–5 bullet points describing what changed.
2. If `STATUS.md` has more than 20 dated entries, delete the oldest ones to keep it at 20.
3. Update the "Current known issues" section at the bottom to reflect current state.
