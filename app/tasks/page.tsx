import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { logOut } from "../login/actions";
import { addTask } from "./actions";
import { SKILLS } from "./skills";
import TaskCheckbox from "./TaskCheckbox";

type Task = {
  id: string;
  title: string;
  skill: string;
  done: boolean;
};

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
  const { data: tasks } = await supabase
    .from("tasks")
    .select("id, title, skill, done")
    .order("created_at", { ascending: true })
    .returns<Task[]>();

  return (
    <main>
      <h1>Tasks</h1>
      <p>Signed in as {user.email}</p>

      <form className="task-form" action={addTask}>
        <label htmlFor="title">New task</label>
        <input id="title" name="title" type="text" maxLength={200} required />
        <label htmlFor="skill">Skill</label>
        <select id="skill" name="skill" required defaultValue="">
          <option value="" disabled>
            Choose a skill
          </option>
          {SKILLS.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
      {error && <p className="form-error">{error}</p>}

      {tasks && tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.done ? "task done" : "task"}>
              <TaskCheckbox id={task.id} done={task.done} title={task.title} />
              <span className="task-title">{task.title}</span>
              <span className="skill-label">{task.skill}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty">No tasks yet. Add one above.</p>
      )}

      <form action={logOut}>
        <button type="submit">Log out</button>
      </form>
    </main>
  );
}
