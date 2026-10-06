# Corr

**Your routines, your discoveries, your everyday moments.**

Corr is a full-stack skincare companion that combines AI-assisted routines, daily habit tracking, a personal product collection and a private journal. Users can build routines around their goals and budget, collect products they have tried, and keep a diary with photos and a soundtrack for each day.

Built with **Flutter, Node.js, Express, Prisma and MySQL**, with Firebase Authentication, Groq-powered routine generation and Spotify embeds.

[Explore Corr](https://inquisitive-clafoutis-600746.netlify.app/) · [Backend](https://glowguide-fullstack.onrender.com/) · [GitHub](https://github.com/f20240209-png/GlowGuide-Fullstack)

Google sign-in is the recommended way to explore the demo. The features below describe the latest source; backend, database and frontend updates must all be deployed for them to appear in the hosted app.

## Features

### Dashboard and personalised routines

- A cream and sage dashboard with routine cards, consistency insights and quick access to the collection and journal.
- Profiles with skin type, goals, age, budget, existing products and routine notes.
- AI-assisted morning, evening and optional weekly routines, with instructions, product suggestions, tips and warnings.
- Suggestions constrained to the stored product catalogue. Product names and prices are checked against the database, and the cost of new purchases is validated against the user's budget.
- Owned products are excluded from new-purchase costs. Prices and budgets currently use **INR**.
- Cached routines can be refreshed. Profile edits invalidate the cache, and a profile change during generation prevents a stale routine from being saved.

### Routine logging and consistency

- Log morning and evening sessions separately or together, with products, notes and an optional photo.
- Revisit previous routine logs through the history screen.
- A monthly consistency heatmap and streak display based on local calendar days.
- Repeated entries for the same session do not inflate completion. Older `night` logs count towards the evening session.
- Empty months still display a calendar; timezone and daylight-saving changes are handled when an IANA timezone is available.
- Ingredient keyword checks use stored conflict pairs and return severity information and warnings.

### My Discoveries: a personal product collection

Turn products you have tried into a collection of photo cards.

- **An uploaded image and a review are required** to add a discovery.
- Record the product name, brand, category, discovery date and an optional rating.
- Browse a card grid, open details, edit reviews or replace photos.
- Search by product name or brand, filter by category or rating, and sort by newest, oldest, rating or name.
- View the collection count and score on Home and your own profile.
- Each distinct collected product contributes one point. Duplicate product or photo submissions within the same account are rejected.
- Earn milestone badges and see progress towards the next milestone.

| Collection size | Milestone |
| --- | --- |
| 1 | First discovery |
| 5 | Curious collector |
| 10 | Shelf curator |
| 25 | Collection keeper |

The score and badges reflect the current collection size. The collection stores personal records separately from the catalogue used for AI routines.

### Skincare Journal: a private diary

The journal is for anything worth remembering, including thoughts and everyday moments beyond skincare.

- A notebook layout with ruled paper, a free-form title and writing area, and a Polaroid-style photo frame below the page.
- One saved page per date, with a calendar and saved-page markers to revisit entries.
- Browse dates between **1900 and 2100**, including past and future dates.
- Writing, photos and songs are optional individually; a page needs at least one of them to be saved.
- Add, replace or remove a photo, edit an entry, or delete the page.
- Explicit saving and draft prompts when changing dates or leaving within the app.
- Failed saves retain the draft. Version checks prevent an older tab from overwriting a newer saved page.
- **Journal pages, photos and songs are private to the account owner and are not included in friends' profiles.**

### A soundtrack for each day

Attach one Spotify song to a journal page using **paste link + embedded player**.

1. Select **Add a song** below the Polaroid.
2. Paste a full Spotify song link.
3. Select **Use this song** to attach the link.
4. Choose **Load Spotify player** when you want to connect to Spotify. The player is not created just by opening a journal page.
5. Save the journal page to keep the song with that date.

Songs can be changed or removed. A song-only journal entry is supported. The web app includes an **Open in Spotify** link; native builds provide a song-link copy fallback.

This integration needs no Spotify API key or Spotify account connection inside Corr. Spotify controls playback availability, so a preview may be shown. Full song links, share query parameters, locale-prefixed track links and Spotify track URIs are supported. Playlists, albums, iframe HTML and shortened `spotify.link` URLs are not accepted in this version.

### Community and friends

- A community feed with topic filters, an Explore view and a separate view for your questions.
- Ask questions, write answers, like posts and mark answers as helpful.
- Search for users by username and send, accept, reject or cancel friend requests.
- Friend search, requests, lists and profiles expose only names and usernames, plus connection status.
- Skin details, goals, budgets, routine notes/photos, collections and journal entries stay out of friend responses.
- Either participant can remove a friendship from the friend profile screen. User search is debounced to reduce unnecessary requests.

## Security and privacy

Corr includes protections for personal data, authentication, uploads and API usage.

### Implemented protections

- **Authenticated access:** Private API routes require a valid Corr JWT. Journal entries, discoveries, routine logs and their photos are scoped to the authenticated owner.
- **Private friend profiles:** Friends see public identity information only. Skin details, budgets, goals, collections and journal content are excluded. Either user can remove a friendship.
- **Request limits:** Sign-in, registration, AI generation, uploads, searches and social actions are throttled. Cached routine reads do not consume the AI generation allowance.
- **Safer uploads:** New photos are validated, size-limited, decoded and re-encoded with metadata removed. Photo saves authenticate before expensive processing, and concurrent saves are limited. Older stored routine photos remain unchanged.
- **Private responses:** API responses use `Cache-Control: private, no-store`. The public `/uploads` endpoint has been removed.
- **Safer errors:** Unexpected errors return a generic message and request ID. Application error logs exclude raw database queries, provider responses, credentials and private content.
- **Security headers:** The backend uses Helmet and exact-origin CORS. Netlify headers include a limited enforced Content Security Policy and a broader report-only policy.
- **Spotify loading choice:** Saved journal songs create an embedded player only after the user selects **Load Spotify player**.

### Third-party services

AI routine generation sends skincare profile context to Groq; journal text and photos are not included in routine requests. Loading a Spotify player connects the browser to Spotify.

### Current limitations

Browser authentication still stores a seven-day JWT in SharedPreferences/localStorage. Logout does not revoke an already copied token.

Journal content is private from other users but is not end-to-end encrypted. Server/database operators can access stored content. Backup encryption and retention depend on hosting configuration.

Rate limits currently use per-process memory and reset on restart. Multiple API instances require a shared rate-limit store.

Planned improvements include revocable sessions, safer browser authentication, sharing preferences, blocking, data export and account deletion.

### Deployment and verification

This update requires **Node.js 22 or newer**, a backend redeployment and a fresh Flutter web build. No database migration is required.

Backend tests cover authentication, ownership checks, private media access, request limits and safe error handling. The local production dependency audit reported zero vulnerabilities on **6 October 2026**; development dependency findings remain under review.  

## Architecture

Corr uses a Flutter client and a modular Express backend. Controllers handle requests, services contain application logic, and Prisma connects the backend to MySQL.

```mermaid
flowchart TD
    App["Flutter web · Netlify"] -->|"REST + app JWT"| API["Express API · Render"]
    App -->|"Google sign-in"| Firebase["Firebase Authentication"]
    API -->|"Verify ID token"| Firebase
    API -->|"Generate routine"| Groq["Groq"]
    API --> ORM["Prisma ORM"]
    ORM --> DB["MySQL"]
    App -->|"Embedded player"| Spotify["Spotify"]
```

**Authentication:** Google sign-in uses Firebase. The backend verifies the Firebase ID token and issues a Corr JWT for protected API requests. Email/password account flows are also implemented. The Flutter client manages session state with Provider and SharedPreferences.

**AI:** The backend sends profile information and catalogue candidates to Groq, validates the generated JSON and product selections, calculates costs and stores the result. It regenerates incomplete cached data rather than treating it as a valid routine.

**Private media:** Discovery and journal images are decoded, resized, converted to WebP and stripped of metadata. Full images and thumbnails are stored in separate MySQL image tables and served through authenticated endpoints with private/no-store cache headers. Supported uploads are JPG, PNG and WebP, up to 5 MB and 16 megapixels.

**Data consistency:** Collection and journal edits use version checks and database transactions. Journal pages are unique per user and date. Prisma uses `relationMode = "prisma"`; application code handles the relevant record and image cleanup.

## Technology

| Area | Technology |
| --- | --- |
| Client | Flutter / Dart, Provider, HTTP, SharedPreferences |
| Authentication | Firebase Authentication, Firebase Admin, app JWTs |
| API | Node.js, Express |
| Database | MySQL, Prisma ORM |
| AI routines | Groq SDK; model selected through `GROQ_MODEL` |
| Image uploads | Multer, Sharp |
| Music | Official Spotify iframe embeds on Flutter web |
| Hosting | Netlify frontend, Render backend |
| Tests | Node test runner, Flutter tests and HTTP mocks |

## Repository structure

| Path | Purpose |
| --- | --- |
| [`skincare-app/backend/src/routes`](skincare-app/backend/src/routes) | API routes and authentication boundaries |
| [`skincare-app/backend/src/controllers`](skincare-app/backend/src/controllers) | Request handling for accounts, profiles, routines, logs, community, collections and journal |
| [`skincare-app/backend/src/services`](skincare-app/backend/src/services) | AI validation, consistency calculations, media processing and database access |
| [`skincare-app/backend/prisma`](skincare-app/backend/prisma) | Schema, migrations, client generation and development seed data |
| [`skincare-app/backend/scripts`](skincare-app/backend/scripts) | Additive preparation for existing Corr databases |
| [`skincare-app/backend/test`](skincare-app/backend/test) | Backend and HTTP regression tests |
| [`skincare-app/skincare_flutter/lib/screens`](skincare-app/skincare_flutter/lib/screens) | Application screens |
| [`skincare-app/skincare_flutter/lib/widgets`](skincare-app/skincare_flutter/lib/widgets) | Shared dashboard, routine, community, collection and journal widgets |
| [`skincare-app/skincare_flutter/lib/services`](skincare-app/skincare_flutter/lib/services) | API requests and timezone helpers |
| [`skincare-app/skincare_flutter/test`](skincare-app/skincare_flutter/test) | API, model and widget tests |

## Local development

### Requirements

- Node.js **22 or later**, npm and Git. The backend `.node-version` selects Node 22 for Render; a `NODE_VERSION` environment override must also be 22 or newer.
- A Flutter SDK that includes **Dart 3.11 or later**, matching `pubspec.yaml`.
- A MySQL database, a Firebase project and Firebase Admin credentials.
- A Groq API key for routine generation. The collection, journal and Spotify embeds do not require that key.

### 1. Clone and install the backend

```bash
git clone https://github.com/f20240209-png/GlowGuide-Fullstack.git
cd GlowGuide-Fullstack/skincare-app/backend
npm ci
```

Create `skincare-app/backend/.env` with your own configuration:

```dotenv
DATABASE_URL="mysql://app_user:change_me@localhost:3306/corr"
JWT_SECRET="replace_with_a_long_random_secret"
FIREBASE_PROJECT_ID="your-firebase-project-id"
FIREBASE_CLIENT_EMAIL="your-service-account-email"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
GROQ_API_KEY="your-groq-api-key"
GROQ_MODEL="openai/gpt-oss-120b"
PORT=3000
CORS_ORIGINS="https://your-frontend-domain.example"
```

Keep `.env` and service-account credentials out of Git. `JWT_SECRET` must stay consistent across backend restarts. `GROQ_MODEL` is optional; the value shown is the current code default. Localhost origins are allowed in development. Production accepts the deployed Netlify origin and exact HTTPS origins from `CORS_ORIGINS`; do not include localhost, wildcards or URL paths in a production allowlist.

### 2. Prepare the database

Choose the path that matches your database. Generating the Prisma client does not create or upgrade database tables.

**Existing Corr database**

From the backend directory, with `DATABASE_URL` pointing to the intended database:

```bash
npm run generate
npm run prepare-db
npm run prepare-journal
```

`prepare-db` upgrades the original profile, username and friend-request schema. It requires existing `User` and `Profile` tables. `prepare-journal` also prepares discovery tables, adds product categories, creates the journal tables and adds the optional Spotify song column. These scripts retain existing records and can be run again.

**New, empty development database**

Create an empty MySQL database and point `DATABASE_URL` at it. The following commands generate the initial schema from the current Prisma models and apply it to that empty database:

```bash
npm run generate
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script --output prisma/bootstrap.sql
npx prisma db execute --schema prisma/schema.prisma --file prisma/bootstrap.sql
```

Optional sample data for this development database:

```bash
node prisma/seed.js
node prisma/seed_conflicts.js
```

The sample seeds replace the product catalogue and ingredient-conflict records, respectively. Use them only for development data you intend to replace. Product metadata in the sample catalogue includes fields inferred from product names and needs curation before being treated as verified label information.

The preparation scripts and SQL bootstrap do not record applied Prisma migrations. If you switch to migration-based deployments later, baseline the schema changes already applied before using `prisma migrate deploy`. The historical migration directory includes legacy changes and should be reviewed rather than replayed blindly on an existing installation.

### 3. Start the API

```bash
npm run dev
```

The default API address is `http://localhost:3000/api`. `GET http://localhost:3000/` returns the server's running message.

### 4. Configure and run Flutter

Enable the Google authentication provider in your Firebase project. Enable Email/Password if you want to use those account flows. Configure the frontend Firebase settings and Google web client for the same project, including authorised domains. The relevant frontend files are `lib/firebase_options.dart` and `web/index.html`.

From the frontend directory:

```bash
cd ../skincare_flutter
flutter pub get
flutter run -d chrome --dart-define=API_BASE_URL=http://localhost:3000/api
```

`API_BASE_URL` must include `/api`. Without the Dart define, the client uses the deployed Render backend.

## Tests

Backend, from the repository root:

```bash
cd skincare-app/backend
npm test
```

The backend suite covers authentication and token handling, profile updates, routine validation and caching, consistency calculations, collection queries and pagination, private journal access, media uploads, stale-save protection, Spotify link validation and repeatable journal preparation.

Flutter, from the repository root:

```bash
cd skincare-app/skincare_flutter
flutter analyze
flutter test
```

Flutter tests cover API requests, multipart uploads, date and milestone models, routine widgets and journal interactions, including invalid song links and draft preservation. Run the full Flutter checks with a compatible Flutter SDK before publishing.

## Deployment

### Backend on Render

Configure the backend service with:

| Setting | Value |
| --- | --- |
| Root directory | `skincare-app/backend` |
| Build command | `npm install && npx prisma generate && npm run prepare-journal` |
| Start command | `npm start` |
| Environment | Database, JWT, Firebase and Groq values described above |

Run `prepare-db` against the deployed database once if the original Corr schema still needs that upgrade. The build's `prepare-journal` step then handles collection, journal and song additions using Render's database configuration.

After a successful schema preparation, the build logs include:

```text
Corr journal Spotify songs are ready.
Corr collection and private journal preparation complete. Existing records retained.
```

### Frontend on Netlify

Once the updated backend is available, create a fresh web release from the repository root:

```bash
cd skincare-app/skincare_flutter
flutter pub get
flutter build web --release --dart-define=API_BASE_URL=https://glowguide-fullstack.onrender.com/api
```

Publish the contents of `build/web` to the Netlify site. For a fork, replace the API URL and configure `CORS_ORIGINS` and Firebase authorised domains for your frontend domain. A backend deployment does not rebuild or publish Flutter; both releases are required for features that span the client and API.

## API overview

The deployed base URL is `https://glowguide-fullstack.onrender.com/api`. Protected requests use `Authorization: Bearer <app-jwt>`.

| Area | Main endpoints |
| --- | --- |
| Authentication | `/auth/register`, `/auth/login`, `/auth/google`, `/auth/firebase-login`, `/auth/session` |
| Profile and catalogue lookup | `/profile`, `/profile/search-products`, `/profile/username` |
| AI routines | `/recommendations`, `/recommendations/refresh` |
| Routine logs and heatmap | `/logs`, `/logs/heatmap` |
| Ingredient checks | `/analyze-routine` |
| Product collection | `/discoveries`, `/discoveries/:id`, `/discoveries/:id/photo` |
| Private journal | `/journal?month=YYYY-MM`, `/journal/:date`, `/journal/:date/photo` |
| Community | `/community`, `/community/my-posts`, post and answer actions |
| Friends | `/users/search`, `/friends`, `/friends/requests`, request actions, private identity profiles and `DELETE /friends/:userId` |

Discovery creation and journal saving use multipart requests. Discovery photos are required; journal photos are optional. Journal saves include the loaded page version and an optional `spotifyUrl`. Omitting that field preserves an existing song for older clients; sending an empty value removes it.

## Security and privacy

The first security update keeps personal data out of social profiles and adds API safeguards:

- All API responses use `Cache-Control: private, no-store`. Journal, discovery and routine-log data are scoped to the authenticated owner.
- Photo writes authenticate first and share an account limit. At most two photo saves run at once on an API instance, with one per account. Routine photos, like journal and discovery photos, are decoded with Sharp, size-limited, re-encoded as WebP and stripped of metadata. Older stored routine photos are retained as-is; new and replacement photos receive these protections.
- There is no public `/uploads` filesystem endpoint. Existing uploaded files are not deleted; any external feature using an old public upload URL must move to an owner-authorised media endpoint.
- Sign-in, registration, user search, social writes and actual AI generation are throttled. Cached routine reads do not consume the AI generation allowance. A throttled request returns JSON with HTTP 429 and `Retry-After`.
- Unexpected errors return a safe message and a server-generated request ID. Logs contain limited error classifications rather than queries, provider responses, passwords, tokens or journal text.
- Helmet protects API responses. Flutter's `web/_headers` provides actual Netlify headers, including a limited enforced CSP and a broader **report-only** CSP for browser validation. Google popups, camera uploads and Spotify embeds remain supported.
- A saved soundtrack connects to Spotify only after the user chooses to load its player or open its link. Routine generation sends profile context to Groq, not journal text or photos.

The limits use per-process memory and reset on restart. Multiple server instances need a shared store before scaling. Render defaults to one trusted proxy hop; verify the ingress topology and set `TRUST_PROXY_HOPS` to the actual trusted hop count (0–3). Never enable unlimited proxy trust.

Browser authentication still uses the existing seven-day JWT in SharedPreferences/localStorage. Logout is still local and does not revoke an already copied token. Revocable sessions, safer browser authentication, granular sharing preferences, blocking, export and account deletion are the next security phase. The journal is private from other app users, but is **not end-to-end encrypted**; server/database operators can access stored content. Database and backup encryption and retention depend on the hosting configuration.

No database schema change is required for this first update. Redeploy the backend and rebuild/redeploy Flutter web to activate the protections and user-facing changes.

## Scope and current limitations

- Corr organises cosmetic routines and habits; it does not diagnose skin conditions or establish a product's medical safety or effectiveness.
- Ingredient checks cover known database pairs and keyword matches. No detected conflict is not proof of compatibility.
- Catalogue prices are stored purchase prices in INR, rather than live prices or estimates of monthly usage.
- The public demo does not currently offer phone/OTP login.
- The Spotify feature attaches a song through a link; in-app Spotify search and account synchronisation are not included.
- Journal draft prompts cover navigation inside the app. Unsaved writing is not a durable offline draft after closing or reloading the browser.
- MySQL currently stores discovery and journal image bytes. Moving media to object storage is a possible scaling improvement.

## Author

Built by **Adarsh Sahay** as a full-stack project exploring personalisation, habit tracking, product discovery and private journaling.
