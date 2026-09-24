# Project state
Last updated: 2026-09-23

## Works
- Next.js site (App Router, TypeScript, plain CSS) is live on Vercel at https://ai-workshop-three-woad.vercel.app/
- Supabase project exists and is linked to the repo.

## Broken or flaky
- Nothing known broken.
- The site does not use Supabase yet.

## Environment notes
- Repo: ralphramosgit/AI-Workshop. Every merge to main deploys to Vercel.
- Not yet checked: whether the Supabase URL and publishable key are already set as environment variables in Vercel and in .env.local.
- Undecided: whether to keep Supabase email confirmation on. The built-in email sender has a low hourly limit (check Supabase, Authentication, Rate Limits).

## Next session
- Start Slice 1 (sign up and log in).
- Decide on email confirmation before Slice 1 ships.
- Expect Claude Code to ask about adding @supabase/supabase-js and @supabase/ssr.
