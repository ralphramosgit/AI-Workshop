# Project state
Last updated: 2026-10-01

## Works
- Next.js site (App Router, TypeScript, plain CSS) is live on Vercel at https://ai-workshop-three-woad.vercel.app/
- Supabase project exists (ai-workshop, us-west-1). NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are set in Vercel and .env.local. Email confirmation is on. Site URL and redirect URLs are configured.
- Slice 1 (sign up and log in) is built: /signup, /login, /tasks, and /auth/confirm for the email link.

## Broken or flaky
- Nothing known broken.
- The confirmation link only works if opened in the same browser used to sign up.

## Environment notes
- Repo: ralphramosgit/AI-Workshop. Every merge to main deploys to Vercel.
- Email confirmation is on. The built-in email sender has a low hourly limit (check Supabase, Authentication, Rate Limits), so test with only a few sign-ups.

## Next session
- Test Slice 1 done-criteria (a)-(d) on the live site, then mark Slice 1 done in roadmap.md.
- Start Slice 2 (tasks with skill tags).
