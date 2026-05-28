# PainDB

> **Note:** This repository is no longer actively maintained. The code may be outdated.

PainDB is a full-stack app that scrapes Reddit posts and uses AI to find pain points — problems that users are complaining about. Similar pain points are grouped together by comparing them in vector space, so you can see how common a problem actually is and how well validated it is.

The idea is to help founders and developers in general discover ideas worth making.

<img width="1920" height="1100" alt="image" src="https://github.com/user-attachments/assets/964e5bfa-fb90-4822-94e7-4c452aa35af2" />

---

## How It Works

**1. Scraping** — A Python backend scrapes Reddit posts and comments from relevant subreddits.

**2. AI extraction** — Each post is sent to an LLM (OpenAI) which pulls out pain points in a structured format.

**3. Vectorisation & clustering** — Pain points are turned into embeddings using `sentence-transformers` and compared in vector space. This way similar pain points can be detected.

**4. Validation scoring** — Each cluster gets a score based on how often the problem appears, how recent the posts are, and how much engagement they got.

**5. Frontend** — A Next.js dashboard where you can browse problems by category, see related ones, and export the data.

<img width="1920" height="1102" alt="image" src="https://github.com/user-attachments/assets/bef18500-fcc4-4d7a-805b-c829ed846b89" />

---

## Tech Stack

**Frontend**
- [Next.js 15](https://nextjs.org) (App Router, TypeScript)
- Tailwind CSS v4, Framer Motion
- Auth via [NextAuth v5](https://authjs.dev) — magic link email + Google OAuth
- Stripe for payments

**Backend (Python)**
- Reddit scraping via PRAW / AIOHTTP
- OpenAI API for pain point extraction
- `sentence-transformers` + `scikit-learn` for embeddings and clustering
- FastAPI for internal API endpoints

**Database**
- PostgreSQL (via `pg` / `psycopg2`)
- Nodemailer for transactional email

<!-- screenshot: auth / pricing page -->

---

## Local Setup

Copy the example env file and fill in your keys:

```bash
cp .env.example .env
```

**Frontend:**
```bash
npm install
npm run dev
```

**Python backend:**
```bash
pip install -r requirements.txt
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## License

[MIT](LICENSE)
