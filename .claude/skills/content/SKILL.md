---
name: content
description: Update clinic content — address, hours, testimonials, services, doctor bio, map. All changes go through constants.ts.
allowed-tools: Read Edit Bash Glob
---

# /content — Update Clinic Content

All clinic data lives in one file: `src/lib/constants.ts`
Never hardcode data directly in page files — always update constants.ts.

## Step 1 — Ask what to update

Ask the user:
> What would you like to update?
> 1. **Address / Contact / Hours** — clinic location, phones, email, opening hours
> 2. **Add testimonial** — add a new patient review
> 3. **Edit / remove testimonial** — modify or delete an existing review
> 4. **Add service** — add a new treatment to a category
> 5. **Edit service** — change name, description, or category of an existing treatment
> 6. **Doctor bio** — update qualifications, experience, or profile text
> 7. **Map URL** — update the Google Maps embed link

---

## Before Making Any Change

Always read the relevant section of `src/lib/constants.ts` first and show the user the current value before changing it. Confirm the new value with the user before writing.

---

## Adding a Testimonial

Read current TESTIMONIALS array, then append a new entry in this exact shape:
```typescript
{
  name: "Patient Name",
  date: "Month YYYY",   // e.g. "April 2025"
  text: "Full review text here.",
  rating: 5,            // 1–5
}
```
Keep testimonials in reverse chronological order (newest first).

## Adding a Service

Services are grouped by category in constants.ts. Read the current structure, identify the right category (`dental` / `skin` / `aesthetics`), and append:
```typescript
{ name: "Service Name", description: "One or two sentence description." }
```

## Updating Map URL

The embed URL must be in Google Maps embed format (starts with `https://www.google.com/maps/embed?pb=`).
Update the `mapUrl` field in the `CLINIC` object.

## After Changes

- Run `npm run build` to confirm no TypeScript errors
- Update `STATUS.md` with a timestamped entry describing what changed
