import { redirect } from "next/navigation";
import { CheckCheck, ListTodo, LogOut, Plus } from "lucide-react";
import { createClient } from "@/app/lib/supabase/server";
import { logOut } from "../login/actions";
import { addTask } from "./actions";
import TaskCard, { type Task } from "./TaskCard";
import TaskFields from "./TaskFields";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Row level security means this only returns the signed-in user's tasks.
  const { data } = await supabase
    .from("tasks")
    .select("id, title, skill, class_name, done, due_date")
    .order("created_at", { ascending: true })
    .returns<Task[]>();

  const tasks = data ?? [];
  const open = tasks.filter((t) => !t.done);
  const completed = tasks.filter((t) => t.done);

  return (
    <main className="tasks-page">
      <header className="page-header">
        <div>
          <h1>Tasks</h1>
          <p className="muted">Signed in as {user.email}</p>
        </div>
        <form action={logOut}>
          <button type="submit" className="button-secondary">
            <LogOut size={16} aria-hidden /> Log out
          </button>
        </form>
      </header>

      <section className="card add-card">
        <h2>Add a task</h2>
        <form action={addTask}>
          <TaskFields idPrefix="new" />
          <div className="card-actions">
            <button type="submit">
              <Plus size={16} aria-hidden /> Add task
            </button>
          </div>
        </form>
        {error && <p className="form-error">{error}</p>}
      </section>

      <section>
        <h2 className="section-title">
          <ListTodo size={20} aria-hidden /> To do
          <span className="count">{open.length}</span>
        </h2>
        {open.length > 0 ? (
          <ul className="card-list">
            {open.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </ul>
        ) : (
          <p className="empty">Nothing to do. Add a task above.</p>
        )}
      </section>

      <section>
        <h2 className="section-title">
          <CheckCheck size={20} aria-hidden /> Completed
          <span className="count">{completed.length}</span>
        </h2>
        {completed.length > 0 ? (
          <ul className="card-list">
            {completed.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </ul>
        ) : (
          <p className="empty">Tick a task to move it here.</p>
        )}
      </section>
    </main>
  );
}
