---
description: Diagnose production issues — Azure errors, domain redirect problems, failed deployments, GitHub Actions failures.
allowed-tools:
  - Bash
  - Read
  - Glob
  - Grep
---

# /debug — Diagnose Production Issues

Systematic diagnosis of production problems. Goes from symptoms to root cause.

## Step 1 — Identify the symptom

Ask the user (or infer from context):
> What are you seeing?
> 1. **Azure shows "Application Error"** — 500/503 on the Azure URL
> 2. **Domain redirecting wrongly** — drshivanisingh.com goes to wrong site
> 3. **GitHub Actions failed** — deployment didn't complete
> 4. **Page not updating** — pushed but changes not live
> 5. **Something else** — describe the issue

---

## Azure Application Error

Check in this order:

### 1. Real-time log stream (no login needed)
```bash
curl -s "https://clinic-website-v1-web-c6c8asakhpcahcam.scm.centralindia-01.azurewebsites.net/api/logstream" --max-time 15
```
Look for: `Error: Could not find a production build` → zip step was removed from workflow.
Look for: `Cannot find module` → missing files in deployment package.
Look for: `EADDRINUSE` → PORT not set correctly (should be 8080).

### 2. Check last GitHub Actions run
```bash
gh run list --limit 3
gh run view <run-id> --log | tail -100
```

### 3. Check workflow file for zip step
```bash
grep -n "zip\|standalone\|upload-artifact\|deploy.zip" D:/Personal/clinic/.github/workflows/main_clinic-website-v1-web.yml
```
Must see: `zip -r ../../deploy.zip .` and `path: deploy.zip`
If missing → the critical zip step was removed. Add it back:
```yaml
- name: Zip standalone for deployment
  run: cd .next/standalone && zip -r ../../deploy.zip .
```

### 4. Check app settings
```bash
az webapp config appsettings list --name clinic-website-v1-web --resource-group clinic-website-v1 --output table
```
Must have: `PORT=8080`, `HOSTNAME=0.0.0.0`, `SCM_DO_BUILD_DURING_DEPLOYMENT=false`

---

## Domain Redirecting Wrongly

Check DNS resolution:
```bash
nslookup drshivanisingh.com
nslookup www.drshivanisingh.com
curl -sI https://drshivanisingh.com | head -20
curl -sI https://www.drshivanisingh.com | head -20
```

**If redirecting to lovable.app or another site:**
- GoDaddy Domain Forwarding rule is still active
- Fix: open `/portal` → GoDaddy → DNS → delete any Forwarding/Redirect entry
- Confirm A record for `@` points to Azure IP
- Confirm CNAME for `www` points to `clinic-website-v1-web-c6c8asakhpcahcam.centralindia-01.azurewebsites.net`
- DNS changes can take up to 48 hours to propagate

**If getting SSL error:**
- Check Azure Custom Domains blade for certificate status

---

## GitHub Actions Failed

```bash
gh run list --limit 5
gh run view $(gh run list --limit 1 --json databaseId -q '.[0].databaseId') --log | grep -E "Error|error|failed|FAILED" | head -30
```

Common causes:
- `npm ci` fails → check `package.json` and `package-lock.json` are in sync
- Build TypeScript error → run `npm run build` locally to reproduce
- `az` CLI auth expired → re-run workflow or re-set publish profile secret in GitHub

---

## Page Not Updating After Push

```bash
# Check the last commit was actually pushed
git log origin/main --oneline -5

# Check if Actions ran for that commit
gh run list --limit 5
```

If Actions ran and succeeded but site hasn't updated → Azure may be serving cached content. Force restart:
```bash
az webapp restart --name clinic-website-v1-web --resource-group clinic-website-v1
```

---

## Local Dev Issues

**Turbopack crash "reading file …\nul":**
```bash
ls D:/Personal/clinic/nul 2>/dev/null && rm D:/Personal/clinic/nul || echo "nul file not present"
```

**Port 3001 already in use:**
```bash
npx kill-port 3001
```

**TypeScript errors after editing:**
```bash
cd D:/Personal/clinic && npm run build 2>&1 | grep -E "Error|error TS"
```

---

## After Diagnosing

- Explain the root cause clearly
- Apply the fix if possible
- Suggest running `/dev` → Deploy to push the fix
- Update `STATUS.md` with what was found and fixed
