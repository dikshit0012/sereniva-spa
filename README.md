# Sereniva Spa & Wellness

Frontend-only premium unisex spa booking platform. React 18 + TypeScript + Tailwind CSS + Vite.
All state is local (`localStorage` for bookings) — no backend, no auth, no payments.

## Run locally

    npm install
    npm run dev        # → http://localhost:5173

## Build

    npm run build       # outputs static site to ./dist
    npm run preview      # preview the production build locally

## Deploy to Vercel

**Option A — Vercel CLI**

    npm i -g vercel
    vercel --prod

**Option B — Git**

Push this folder to a GitHub repo and import it at vercel.com/new.
Vercel auto-detects Vite; build command `npm run build`, output directory `dist` (already set in `vercel.json`).

## Routes

- `/` Home · `/services` · `/services/:id` · `/book` · `/booking-confirmation/:id`
- `/dashboard` (overview, bookings, favorites, rewards)
- `/about` · `/contact`
- `/admin` (overview, calendar, appointments, customers, services, therapists, analytics)

## Notes

- Images load from the Unsplash CDN with an automatic `picsum.photos` fallback if any URL fails.
- Bookings persist in the browser's `localStorage`; admin data is in-memory demo state only.
- This was verified with a real `npm install` + `npm run build` before packaging — it compiles cleanly.
