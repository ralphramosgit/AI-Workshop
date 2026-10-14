"use client";

import { useEffect, useState } from "react";
import { setDueDate } from "./actions";
import TaskCheckbox from "./TaskCheckbox";

export type Task = {
  id: string;
  title: string;
  skill: string;
  done: boolean;
  due_date: string | null; // "YYYY-MM-DD", or null for no due date
};

// Today's date on this device, as "YYYY-MM-DD", so it compares directly with due_date.
function todayOnThisDevice() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

// Shows "2026-10-15" as "Oct 15, 2026". UTC is used on purpose: the date has no
// time attached, and reading it in local time would shift it back a day in Hawaii.
function formatDueDate(dueDate: string) {
  return new Date(dueDate + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function TaskRow({ task }: { task: Task }) {
  // The server can't know your device's date, so "today" is filled in once the
  // page is in your browser. Until then, nothing is marked overdue.
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(todayOnThisDevice()), []);

  const overdue =
    !task.done && task.due_date !== null && today !== null && task.due_date < today;

  const classes = ["task"];
  if (task.done) classes.push("done");
  if (overdue) classes.push("overdue");

  return (
    <li className={classes.join(" ")}>
      <TaskCheckbox id={task.id} done={task.done} title={task.title} />
      <div className="task-body">
        <span className="task-title">{task.title}</span>
        <div className="task-meta">
          <span className="skill-label">{task.skill}</span>
          {task.due_date && (
            <span className="due-date">Due {formatDueDate(task.due_date)}</span>
          )}
          {overdue && <span className="overdue-label">Overdue</span>}
        </div>
      </div>
      <form className="due-form" action={setDueDate}>
        <input type="hidden" name="id" value={task.id} />
        <input
          key={task.due_date ?? "none"}
          type="date"
          name="due_date"
          defaultValue={task.due_date ?? ""}
          aria-label={`Due date for "${task.title}"`}
        />
        <button type="submit">Save date</button>
      </form>
    </li>
  );
}
