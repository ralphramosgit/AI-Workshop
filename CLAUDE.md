# CLAUDE.md

## Stack
- Next.js with the App Router (pages live in app/), TypeScript, plain CSS. No Tailwind, no CSS-in-JS libraries.
- Supabase for sign-in and the database.
- Deployed on Vercel. Every merge to main deploys to https://ai-workshop-three-woad.vercel.app/

## Commands
- npm install: install dependencies
- npm run dev: run the site locally at http://localhost:3000
- npm run build: must pass before opening any pull request
- npm run lint: check code style

## Never
- Add a dependency without asking first.
- Edit .env, .env.local, or any environment variable, locally or in Vercel.
- Change auth configuration without saying what is changing and why.
- Create new top-level folders.
- Commit or merge without showing Ralph what changed, unless the prompt explicitly says to.
- Put real personal data in the app, seed data, or tests. Fake names and fake content only.
- Put passwords, API keys, or connection strings in code, commits, or chat.

## Conventions
- Ralph is a beginner. Explain every change in plain language before showing code.
- One slice per pull request. The pull request title names the slice.
- Database changes are written as SQL for Ralph to run in the Supabase SQL Editor. Do not create a supabase/ folder.
- Every table holding user data has row level security turned on, with policies so a user can only read and write their own rows.
- Skill tags are a fixed list: Reading, Writing, Listening, Speaking, Vocabulary, Grammar.
- When something ships or breaks, update project-state.md in the same pull request.

## Current focus
See roadmap.md. Work only on the slice marked ACTIVE.
