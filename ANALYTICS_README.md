# Analytics - Quick Reference

## Current Status

✅ **All set up and working!**

- ✅ `web-vitals` package installed
- ✅ Web Vitals tracking component ready
- ✅ Google Analytics integration ready
- ✅ Dev mode: console.log
- ✅ Production mode: Google Analytics (when GA_ID is set)

---

## Dev Mode (Current)

**Just works!** Check browser console:

```
[Web Vital] LCP: { value: 1234, rating: 'good', id: 'v3-...' }
[Web Vital] FCP: { value: 567, rating: 'good', id: 'v3-...' }
[Web Vital] CLS: { value: 0.05, rating: 'good', id: 'v3-...' }
```

---

## Production Setup (When Ready)

**Only 2 steps:**

### 1. Get Google Analytics ID

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a property (or use existing)
3. Copy your Measurement ID (starts with `G-`)

### 2. Add to Environment Variables

Add to your `.env.production` or hosting platform environment variables:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**That's it!** 

Core Web Vitals will automatically send to Google Analytics in production.

---

## How It Works

**Development:**
```
npm run dev → Console logs metrics
```

**Production:**
```
NEXT_PUBLIC_GA_ID set → Sends to Google Analytics
NEXT_PUBLIC_GA_ID not set → Silent (no tracking)
```

---

## View Your Data

Once GA_ID is set and deployed:

1. Go to [analytics.google.com](https://analytics.google.com)
2. Reports → Engagement → Events
3. Look for: `LCP`, `FCP`, `CLS`, `INP`, `TTFB`

---

## Files (Already Set Up)

- `src/components/analytics/web-vitals-reporter.tsx` - Tracking logic
- `src/app/layout.tsx` - Integration (GA Script + WebVitalsReporter)
- `package.json` - Dependencies installed

**No further action needed** unless you want to enable production tracking with Google Analytics.

---

## Cost

- **Development:** Free (console logs)
- **Google Analytics:** Free (unlimited)

---

## Troubleshooting

**Not seeing console logs in dev?**
- Check browser console (F12)
- Navigate pages to trigger metrics
- LCP/FCP trigger on page load, CLS/INP trigger on interaction

**Not seeing GA events in production?**
- Check `NEXT_PUBLIC_GA_ID` is set correctly
- Wait 24 hours for data to appear in reports (Realtime shows immediately)
- Verify GA property is active

---

**Questions?** Check `ANALYTICS_METRICS.md` for full documentation.
