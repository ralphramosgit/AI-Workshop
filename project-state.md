# Project state
Last updated: 2026-10-14

## Works
- Next.js site (App Router, TypeScript, plain CSS) is live on Vercel at https://ai-workshop-three-woad.vercel.app/
- Supabase project exists (ai-workshop, us-west-1). NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are set in .env.local and in Vercel for All Environments (Production, Preview, Development). Email confirmation is off. Site URL and redirect URLs are configured.
- Slice 1 (sign up and log in) is done. On the live site, a person can create an account with an email and password and land straight on /tasks, which shows the email they are signed in as. They can log out, and logging in with a wrong password shows an error. Visiting /tasks while logged out sends them to the Log in page.

## Broken or flaky
- Slice 2 (tasks with skill tags) code is in a pull request, not merged yet. It needs the tasks table SQL run in the Supabase SQL Editor before it works.
- If email confirmation is turned back on, the confirmation link only works if opened in the same browser used to sign up.

## Environment notes
- Repo: ralphramosgit/AI-Workshop. Every merge to main deploys to Vercel.
- Email confirmation is off, so new accounts can log in straight away and no emails are sent on sign-up.
- The Supabase free plan pauses the project after a stretch of no use. It was paused and restored on 2026-10-14. While paused or restoring, every page on the live site shows "504 MIDDLEWARE_INVOCATION_TIMEOUT", because middleware asks Supabase who is logged in before every page. Fix: Supabase dashboard, Restore project, wait for Healthy.
- Until 2026-10-14 the two Supabase variables in Vercel were set for Production only, so every pull request preview crashed with "500 MIDDLEWARE_INVOCATION_FAILED" and the log "Your project's URL and Key are required". They are now set for All Environments. NEXT_PUBLIC_ variables are baked in when Vercel builds, so after changing one, a preview only picks it up on a new build (a new push, or Redeploy).

## Next session
- Check Slice 2 on the live site against its done-criteria, then mark it DONE.
- Then Slice 3 (due dates). The Skills page moved to Slice 4.
