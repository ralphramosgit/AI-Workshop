import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { logOut } from "../login/actions";

export default async function TasksPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <main>
      <h1>Tasks</h1>
      <p>Signed in as {user.email}</p>
      <form action={logOut}>
        <button type="submit">Log out</button>
      </form>
    </main>
  );
}
