# Onboarding Form

A 4-step vehicle purchase onboarding form built with React + Vite.

## Setup & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

To build for production:

```bash
npm run build
npm run preview
```

## Libraries Used

- **React Hook Form + Zod** — Form state and validation. Zod schemas define the rules for each step, including cross-step logic (e.g. phone required when WhatsApp is selected). RHF connects to Zod via `@hookform/resolvers` and blocks navigation if the current step is invalid.
- **Zustand** — Global store that holds form data across all 4 steps. The `persist` middleware saves a draft to localStorage automatically, so refreshing the page never loses progress.
- **React Router DOM** — Route-based steps (`/onboarding/1–4`) so the URL always reflects the current step, the browser back button works naturally, and the Step 4 Edit buttons are just `navigate()` calls.
- **Tailwind CSS** — Utility-first styling. All layout, spacing, color and responsive design is handled with Tailwind classes directly in the components — no separate CSS files to manage.

## Estimated Time Spent

~6 hours total:

- 30 min — planning and architecture
- 1.5 hrs — schemas and store
- 2.5 hrs — step components and conditional logic
- 1.5 hrs — bug fixes, polish, draft persistence

## Known Trade-offs & Limitations

- **No real API** — the submit is a simulated `setTimeout`. A real implementation would POST to an endpoint and handle server errors.
- **Country list is abbreviated** — only 9 countries listed. Production would use a full ISO 3166 list or a searchable combobox.
- **No unit tests** — skipped due to deadline. Priority targets would be the Zod schemas (especially the cross-step phone rule) and Zustand store actions.
- **Phone formatting** — special characters (spaces, dashes, brackets, `+`) are stripped before digit validation, but the raw formatted input is what gets stored and displayed.