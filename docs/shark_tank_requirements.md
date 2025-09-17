# Youth Venture Shark Tank Platform – Technical Requirements

## Overview
The platform allows participants to pitch their chosen niche company/product/service idea via a YouTube video submission. Core features include:
1. **Pitch submissions**
2. **Public voting**
3. **Leaderboard**
4. **Judge evaluation**
5. **Final results**

The system will be built in **Next.js** with **Firebase** (Authentication + Firestore). Automation is minimized; admins control deadlines and selections manually.

---

## Functional Requirements

### 1. Firebase Setup (Reusable for Future Projects)
- **Authentication**
  - Firebase Auth with Google and Email/Password.
  - Roles stored in Firestore under each user:
    - `participant`
    - `voter`
    - `judge`
    - `admin`
- **Firestore Database**
  - Core collections that can be reused for future events:
    - `users` – roles, profile info
    - `events` – high-level metadata for each event
    - `pitches` – event ID, participant info, video link, description
    - `votes` – event ID, userID, pitchID
    - `scores` – event ID, judgeID, pitchID, rubric scores
- **Scalability**
  - Schema designed so multiple events can be run in the future without code rewrites.

---

### 2. Pitch Submission
- **Form**
  - Fields: team/participant name, email, company/product name, short description, YouTube video link.
- **Constraints**
  - Only logged-in participants can submit.
  - Submissions can be manually closed by admin in Firestore (`event.submissionsOpen = false`).

---

### 3. Public Voting
- **Voting Rules**
  - One vote per authenticated user.
  - Votes stored as `{ eventID, userID, pitchID }`.
  - Firestore security rules prevent duplicate votes (query check).
- **Leaderboard**
  - Votes are counted client-side by aggregating Firestore data.
  - Admin manually locks voting (`event.votingOpen = false`).
- **Top 10**
  - Admin manually selects top 10 pitches after voting (update a flag in Firestore).

---

### 4. Judge Portal
- **Access**
  - Judges log in with accounts marked `role = judge`.
- **Scoring**
  - Judges see only pitches flagged as “top 10.”
  - Each pitch has a rubric form:
    - Description (10 pts)
    - Market viability (10 pts)
    - Creativity (10 pts)
    - Clarity (10 pts)
    - Overall impression (10 pts)
  - Scores stored in Firestore under `scores`.
- **Manual Aggregation**
  - Admin exports scores (or views via leaderboard page) and aggregates manually.

---

### 5. Results
- **Final Ranking**
  - Admin calculates totals manually.
  - Updates `pitches` documents with:
    - `finalRank: 1 | 2 | 3 | null`
    - `winner: true/false`
- **Public Page**
  - Displays final leaderboard with top 3 badges.

---

## Non-Functional Requirements

- **Reusability**: Authentication + database schema must be generic for future events (not hardcoded for “Shark Tank”).
- **Security**: Firestore rules enforce:
  - Participants can only edit their own pitches.
  - Voters can only cast one vote per event.
  - Judges can only score when `isTop10 = true`.
- **Usability**: Mobile-friendly UI, simple forms, clear submission steps.
- **Admin Simplicity**: All time-based events (submission open/close, voting open/close) controlled manually via Firestore flags.

---

## Technical Components

1. **Frontend (Next.js + Tailwind)**
   - Pages:
     - `/submit` → Pitch submission form.
     - `/pitches` → Public gallery + vote button.
     - `/leaderboard` → Shows vote counts.
     - `/judge` → Judge scoring form.
     - `/results` → Final rankings.
   - Shared Components:
     - `PitchCard`
     - `VoteButton`
     - `LeaderboardTable`
     - `JudgeScoreForm`

2. **Backend (Firebase)**
   - **Authentication**: Google + Email/Password.
   - **Firestore Collections**:
     - `users`
     - `events`
     - `pitches`
     - `votes`
     - `scores`

3. **Hosting**
   - Firebase Hosting (Next.js).
   - Firestore as DB.
   - No backend functions needed; everything is client + Firestore.

---

## Workflow Summary

1. **Setup**
   - Admin creates event document in `events`.
   - Configures flags: `submissionsOpen`, `votingOpen`, etc.

2. **Submissions**
   - Participants log in → `/submit`.
   - Pitch saved in `pitches`.

3. **Voting**
   - Public votes → one per user.
   - Leaderboard updates in real time.

4. **Top 10 Selection**
   - Admin marks selected pitches (`isTop10 = true`).

5. **Judging**
   - Judges log in → `/judge`.
   - Submit rubric scores.

6. **Results**
   - Admin manually aggregates judge scores.
   - Updates `finalRank` + `winner` fields in Firestore.
   - Results displayed on `/results`.

---

## Future Enhancements (Optional)
- Automated ranking/score aggregation via Firebase Functions (can be added later).
- Email notifications.
- Multiple event management dashboard for admins.
- Export data (CSV/Excel) for offline review.
