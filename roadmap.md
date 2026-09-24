# Roadmap

## What this is
A study task list for people learning a language. Each task is tagged with a skill, so learners can see which skill they have been avoiding.

## What Done means
A stranger opens the live site and creates an account with an email and password. They add a study task tagged with one of six skills (Reading, Writing, Listening, Speaking, Vocabulary, Grammar), mark it done, log out, log back in and find it still there. Then they open a separate Skills page that shows how many tasks they completed per skill in the last 7 days and which skill they have been avoiding.

## Slices
1. Sign up and log in | done-criteria: (a) On the live site, click Sign up, enter a new email and password, submit, and click the confirmation email link; you land on /tasks reading "Signed in as" followed by that email. (b) Click Log out; the Log in form appears and the email is gone. (c) Log in with that email and a wrong password; an error message appears and you stay on the Log in page. (d) While logged out, type /tasks into the address bar; you are sent to the Log in page. | status: ACTIVE
2. Tasks with skill tags | done-criteria: (a) On /tasks, type "Read one news article", choose Reading from the skill menu, click Add; the task appears with a "Reading" label. (b) Tick its checkbox and reload; it is still ticked. (c) Log out and back in; the task and its tick are still there. (d) Sign up a second account in a private window; its /tasks list is empty and does not show the first account's task. | status: pending
3. Skills page | done-criteria: (a) On /tasks, click the Skills tab; /skills lists all six skills, each with a count of tasks completed in the last 7 days. (b) Complete two Reading tasks and no Speaking tasks, reload /skills; Reading shows 2 and is not marked "Avoiding", Speaking shows 0 and is marked "Avoiding". (c) While logged out, visit /skills; you are sent to the Log in page. | status: pending

## Backlog
- Editing task text
- Deleting tasks
- Due dates
- Custom skills beyond the six
- Tracking more than one language
- Password reset
- Google or other social login
- Charts or streaks
- Reminders
- Dark mode
- Mobile layout polish
