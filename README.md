This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

## Shark Tank Platform (Firebase + Next.js)

This repo includes a lightweight platform to run pitch events with:

- Authentication (Google) and roles stored in Firestore (`users.roles`).
- Pitch submissions (`/submit`).
- Public gallery and voting (`/pitches`).
- Leaderboard (`/leaderboard`).
- Judge scoring (`/judge`).
- Final results (`/results`).

Setup steps:

1. Create a Firebase project. Enable Authentication (Google provider) and Firestore.
2. Copy `.env.local.example` to `.env.local` and fill in Firebase config.
3. Create Firestore collections as needed; add an event document in `events` with fields:
	- `name: string`
	- `isActive: true`
	- `submissionsOpen: true/false`
	- `votingOpen: true/false`
4. Optionally set `NEXT_PUBLIC_CURRENT_EVENT_ID` in `.env.local` to pin to a specific event.
5. Add user roles by editing documents in `users/{uid}` with `roles: ["participant", "voter", "judge", "admin"]` as needed.
6. Deploy Firestore rules from `firebase.rules` to enforce one vote per user and scoped access.

Notes:

- Admins flip flags on the event document to open/close submissions and voting; mark Top 10 by setting `isTop10=true` on selected pitches; publish winners by setting `finalRank` (1..3) and `winner=true` on pitch docs.
- No backend functions are required; everything runs client-side against Firestore.
