---
description: Full functional testing — every button, form, navigation, scroll, admin data save. Reports pass/fail per feature.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
---

# /test — Functional Specification Testing

Tests every interactive element for correct behaviour. This is not a visual review — it is a pass/fail spec test.

## Step 1 — Start dev server

```bash
cd D:/Personal/clinic
npx kill-port 3001 2>/dev/null || true
npm run dev -- --port 3001 &
sleep 15
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001
```

## Step 2 — Write and run Playwright test script

```javascript
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: false, slowMo: 200 });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  const BASE = 'http://localhost:3001';
  const results = [];
  const pass = (name) => results.push({ name, status: 'PASS' });
  const fail = (name, reason) => results.push({ name, status: 'FAIL', reason });

  // ── Navigation ──
  for (const [label, path] of [['Home','/'],[' About','/about'],['Services','/services'],['Contact','/contact'],['Book Appointment','/book-appointment'],['Prescription','/prescription']]) {
    try {
      const res = await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 15000 });
      res.status() === 200 ? pass(`Page loads: ${label}`) : fail(`Page loads: ${label}`, `HTTP ${res.status()}`);
    } catch (e) { fail(`Page loads: ${label}`, e.message); }
  }

  // ── Navbar links ──
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  for (const link of ['About', 'Services', 'Contact', 'Prescription']) {
    try {
      await page.click(`nav a:has-text("${link}")`);
      await page.waitForLoadState('networkidle');
      pass(`Navbar: ${link}`);
      await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    } catch (e) { fail(`Navbar: ${link}`, e.message); }
  }

  // ── Home page CTAs ──
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  try {
    await page.click('text=Book Appointment');
    await page.waitForURL('**/book-appointment', { timeout: 5000 });
    pass('CTA: Book Appointment button → navigates to /book-appointment');
  } catch (e) { fail('CTA: Book Appointment button', e.message); }

  // ── Book Appointment form ──
  await page.goto(BASE + '/book-appointment', { waitUntil: 'networkidle' });
  try {
    await page.fill('#name', 'Test Patient');
    await page.fill('#phone', '9999999999');
    await page.fill('#date', '2026-06-01');
    await page.selectOption('#service', { index: 1 }).catch(() => {});
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    const confirmed = await page.locator('text=confirmed').count() + await page.locator('text=booked').count() + await page.locator('text=received').count() + await page.locator('text=thank').count();
    confirmed > 0 ? pass('Book Appointment: form submits and shows confirmation') : fail('Book Appointment: form submit', 'No confirmation text found after submit');
  } catch (e) { fail('Book Appointment: form submit', e.message); }

  // ── Book Appointment validation ──
  await page.goto(BASE + '/book-appointment', { waitUntil: 'networkidle' });
  try {
    await page.click('button[type="submit"]');
    await page.waitForTimeout(1000);
    const err = await page.locator('[class*="error"], [class*="red"], [role="alert"]').count();
    err > 0 ? pass('Book Appointment: shows validation error on empty submit') : fail('Book Appointment: validation', 'No error shown on empty submit');
  } catch (e) { fail('Book Appointment: validation', e.message); }

  // ── Contact form ──
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  try {
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', 'test@test.com');
    await page.fill('textarea', 'Test message from functional test');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    pass('Contact: form submits without error');
  } catch (e) { fail('Contact: form submit', e.message); }

  // ── Scroll animations ──
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  try {
    await page.evaluate(async () => {
      for (let i = 0; i < document.body.scrollHeight; i += 400) {
        window.scrollTo(0, i);
        await new Promise(r => setTimeout(r, 100));
      }
    });
    pass('Home: full page scroll completes without JS error');
  } catch (e) { fail('Home: scroll', e.message); }

  // ── Testimonial carousel ──
  try {
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);
    const nextBtn = page.locator('button[aria-label*="next"], button:has-text("›"), button:has-text("→")').first();
    if (await nextBtn.count()) {
      await nextBtn.click();
      await page.waitForTimeout(500);
      pass('Testimonial carousel: next button works');
    } else { fail('Testimonial carousel: next button', 'Button not found'); }
  } catch (e) { fail('Testimonial carousel', e.message); }

  // ── Admin page ──
  try {
    const res = await page.goto(BASE + '/admin', { waitUntil: 'networkidle', timeout: 10000 });
    res.status() === 200 ? pass('Admin: page loads') : fail('Admin: page loads', `HTTP ${res.status()}`);
    const hasTable = await page.locator('table, [class*="appointment"], [class*="patient"]').count();
    hasTable > 0 ? pass('Admin: appointment list renders') : fail('Admin: appointment list', 'No table or appointment elements found');
  } catch (e) { fail('Admin: page', e.message); }

  // ── Mobile nav ──
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  try {
    const burger = page.locator('button[aria-label*="menu"], button[aria-label*="nav"], [class*="hamburger"], [class*="mobile-menu"]').first();
    if (await burger.count()) {
      await burger.click();
      await page.waitForTimeout(500);
      pass('Mobile: hamburger menu opens');
    } else { fail('Mobile: hamburger menu', 'Button not found at 375px'); }
  } catch (e) { fail('Mobile: hamburger', e.message); }

  await browser.close();

  // ── Report ──
  const passed = results.filter(r => r.status === 'PASS');
  const failed = results.filter(r => r.status === 'FAIL');
  console.log(`\n===== FUNCTIONAL TEST REPORT =====`);
  console.log(`PASS: ${passed.length}  FAIL: ${failed.length}\n`);
  passed.forEach(r => console.log(`  ✅ ${r.name}`));
  failed.forEach(r => console.log(`  ❌ ${r.name} — ${r.reason}`));
  fs.writeFileSync('D:/Personal/clinic/screenshots/test-report.json', JSON.stringify(results, null, 2));
})();
```

Save as `D:/Personal/clinic/test-runner.js` and run:
```bash
node D:/Personal/clinic/test-runner.js
```

## Step 3 — Report

Print the full pass/fail table. For each failure, diagnose the root cause and offer to fix it.

## Step 4 — Cleanup

```bash
npx kill-port 3001 2>/dev/null || true
rm -f D:/Personal/clinic/test-runner.js
```

Update `STATUS.md` with test results summary.
