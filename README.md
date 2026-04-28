# Dhikr Platform

Modern Islamic digital platform (Next.js) with a real backend:

- Server-side API routes proxy Quran.com + Aladhan (avoids CORS, enables caching)
- SQLite database (Prisma) for favorites and per-user saved items
- Anonymous user cookie to persist data without login

## Getting started (Windows / PowerShell)

1) Install dependencies

```bash
npm install
```

2) Create your env file

```bash
copy .env.example .env
```

3) Create the database + generate Prisma client

```bash
npm run db:migrate
```

4) Run the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Pages

- `/` landing page
- `/quran` browse Surahs + save favorites (stored in SQLite)
- `/prayer-times` uses geolocation + server API proxy

