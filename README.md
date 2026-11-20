# Syncpick

A directory where local service providers (plumbers, electricians, carpenters, etc.) list their businesses, with categories, search, reviews and a map.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in:
   - `ATLAS_DB_URL` – MongoDB connection string (local MongoDB or Atlas)
   - `SECRET` – session secret
   - `MAP_TOKEN` – Mapbox public token
   - `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET` – Cloudinary credentials
3. (Optional) Seed sample data: `node init/index.js` (creates a `demo` user, password `demo1234`)
4. Start: `npm run dev` (or `npm start`), then open http://localhost:8080
