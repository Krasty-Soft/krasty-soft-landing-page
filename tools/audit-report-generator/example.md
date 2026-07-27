# ExampleCorp — Detailed Audit Report

**Prepared by:** Krasty Soft · **Date:** 2026-07-27 · **Commit:** `abc1234`
> **Draft.** Findings marked ⚠️ require live-environment access.

## 1. Security

### S1 — Secrets committed to the repository · **Critical** · 2–4 h
**Reference:** `config/prod.env:12`
An API key is committed in plaintext and readable in git history.

**Fix:** rotate the key, move it to a secret store, and scrub history. **2–4 h.**

### S2 — Missing rate limiting on the login route · **High** · 3–5 h
**Reference:** `src/routes/auth.ts:40`
No throttling allows unlimited credential-stuffing attempts.

**Fix:** add IP + account rate limiting. **3–5 h.**

## 2. What's genuinely good

- Input validation is centralised and consistent.
- HTTPS enforced everywhere with HSTS.
