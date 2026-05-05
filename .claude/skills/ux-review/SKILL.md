---
name: ux-review
description: Visual UX review via Playwright screenshots. Reviews the site as a Product Designer, Senior PM, or CEO evaluating a premium product with 10 million customers.
allowed-tools: Bash Read Write
---

# /ux-review — Expert UX Review

Runs the website, navigates every page, takes full-page screenshots, then delivers a structured critique from a chosen perspective.

## Step 1 — Choose review persona

Ask the user:
> Review as which perspective?
> 1. **Product Designer** — visual design, spacing, typography, colour, hierarchy, motion, premium feel
> 2. **Senior PM** — conversion, user goals, trust signals, CTAs, funnel clarity
> 3. **CEO** — brand positioning, competitive premium feel, first impression, would I be proud to show this to investors?
> 4. **All three** — full review from every angle

---

## Step 2 — Start dev server

```bash
cd D:/Personal/clinic
npx kill-port 3001 2>/dev/null || true
npm run dev -- --port 3001 &
sleep 15
```

## Step 3 — Capture screenshots

```javascript
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: false, slowMo: 300 });
  const dir = 'D:/Personal/clinic/screenshots/ux-review';
  fs.mkdirSync(dir, { recursive: true });

  const page = await browser.newPage();

  // Desktop (1440px)
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const [route, name] of [['/', 'home'], ['/about', 'about'], ['/services', 'services'], ['/contact', 'contact'], ['/book-appointment', 'book-appointment']]) {
    await page.goto('http://localhost:3001' + route, { waitUntil: 'networkidle', timeout: 30000 });
    await page.evaluate(async () => {
      for (let i = 0; i < document.body.scrollHeight; i += 300) {
        window.scrollTo(0, i);
        await new Promise(r => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${dir}/${name}_desktop.png`, fullPage: true });
  }

  // Mobile (390px — iPhone 14)
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [route, name] of [['/', 'home'], ['/book-appointment', 'book-appointment']]) {
    await page.goto('http://localhost:3001' + route, { waitUntil: 'networkidle', timeout: 30000 });
    await page.evaluate(async () => {
      for (let i = 0; i < document.body.scrollHeight; i += 300) {
        window.scrollTo(0, i);
        await new Promise(r => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
    await page.screenshot({ path: `${dir}/${name}_mobile.png`, fullPage: true });
  }

  await browser.close();
  console.log('Screenshots saved to', dir);
})();
```

Save as `D:/Personal/clinic/ux-review-runner.js`, run it, then read every screenshot with the `Read` tool.

---

## Step 4 — Review criteria by persona

### Product Designer lens
Evaluate against these standards (imagine this is a luxury brand or premium SaaS site):
- **Visual hierarchy:** Is the most important thing the most prominent?
- **Spacing & breathing room:** Does it feel tight/cramped or premium/airy?
- **Typography:** Consistent scale? Readable weights? Comfortable line lengths?
- **Colour system:** Does burgundy/gold/cream hold up across all sections? Any clashes?
- **Hero impact:** Would this stop a scroll? Does it communicate premium in 3 seconds?
- **Images:** Quality, placement, cropping — do they add or distract?
- **Motion & animation:** Does scroll animation feel smooth or jarring?
- **CTAs:** Visually distinct, correct hierarchy (primary vs secondary)?
- **Mobile:** Does layout reflow gracefully or break?
- **10M-customer bar:** Is this indistinguishable from a top-tier clinic brand like Apollo or Clinique?

### Senior PM lens
- **Goal clarity:** Can a new visitor answer "what does this clinic do and why should I choose it" in 5 seconds?
- **Conversion funnel:** How many steps to book an appointment? Any friction?
- **Trust signals:** Reviews, credentials, photos — enough to convert a sceptical patient?
- **CTA placement:** Are Book Appointment CTAs at every logical decision point?
- **Information architecture:** Is it easy to find services, pricing cues, location?
- **Urgency/hooks:** Anything that creates motivation to book now vs later?
- **Contact options:** WhatsApp, phone, form — is the right option prominent for each user type?

### CEO lens
- **First impression:** If an investor or journalist landed on this, what is their gut reaction?
- **Brand premium:** Does this look like a ₹500 or ₹5000 consultation clinic?
- **Differentiation:** What makes Dr. Shivani's clinic stand out vs any other clinic site?
- **Trust at a glance:** Does the doctor's credibility come through immediately?
- **Pride test:** Would I confidently share this URL with 10 influential people?

---

## Step 5 — Structured report

```
## UX Review — [date] — [Persona]

### Overall verdict
One honest sentence.

### What's working well
- (specific, with page/section reference)

### Critical issues (fix before next patient sees this)
- [Page/Section] Issue — impact: HIGH/MEDIUM/LOW

### Improvements (next iteration)
- [Page/Section] Suggestion — expected impact

### Score: X/10
Reasoning.
```

Be direct and specific. Name exact sections and elements. Avoid vague praise. If something is poor, say so clearly.

---

## Step 6 — Cleanup

```bash
npx kill-port 3001 2>/dev/null || true
rm -f D:/Personal/clinic/ux-review-runner.js
```
