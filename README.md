# FAQ & Client Feedback Bot — Opal + Google Cloud Functions 

This repository is a demo implementation for:
- An **FAQ bot** that answers common questions using an AI node in Google Opal.
- A **Client Feedback** flow that collects structured feedback and stores it (simulated) for analysis.

Stack:
- **Google Opal**: visual orchestration (flow JSON included as `opal_flow_faq.json`).
- **Google Cloud Functions**: `index.js` exposes endpoints used by Opal for storing/retrieving feedback or enriched FAQ responses.
- **GitHub Actions**: CI workflow for deploying the Cloud Function.

Important: This repo is for demonstration. Do not commit real secrets. Replace placeholders (`{{...}}`) before deploying.

## Files
- `index.js` — Cloud Function with endpoints:
  - `POST /faq` — accepts `{ question }` and returns a mock AI answer (for portfolio).
  - `POST /feedback` — accepts `{ name, email, rating, comments }` and stores them in a simple in-memory array (demo only).
  - `GET /feedbacks` — returns stored feedbacks (demo).
- `package.json` — project metadata and dependencies.
- `test/local_test.js` — script to test endpoints locally.
- `.github/workflows/deploy.yml` — deploy workflow (requires GitHub secrets for real deploy).
- `opal_flow_faq.json` — Opal flow mapping (FAQ + Feedback collection).
- `README.md` — this file.

## How to run locally
1. Install Node.js >= 18.
2. Install dependencies:
   ```
   npm install
   ```
3. Run the local functions framework:
   ```
   npx @google-cloud/functions-framework --target=appFunction --port=8080
   ```
4. In another terminal run:
   ```
   node test/local_test.js
   ```

## How to push to GitHub
1. Create a new GitHub repository (e.g., `opal-faq-feedback-demo`).
2. Push the contents:
   ```
   git init
   git add .
   git commit -m "Initial demo: FAQ + Feedback bot"
   git branch -M main
   git remote add origin git@github.com:<your-username>/opal-faq-feedback-demo.git
   git push -u origin main
   ```

## Notes for portfolio
- Update `README.md` with your role and architecture decisions.
- Replace mock storage with a real DB (Firestore / Airtable) only if deploying a real service.
- Keep API keys and secrets out of the repo.
