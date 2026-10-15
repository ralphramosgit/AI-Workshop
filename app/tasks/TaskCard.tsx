"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Check,
  Circle,
  CircleAlert,
  CircleCheck,
  GraduationCap,
  Pencil,
  X,
} from "lucide-react";
import { setTaskDone, updateTask } from "./actions";
import TaskFields from "./TaskFields";

export type Task = {
  id: string;
  title: string;
  skill: string;
  class_name: string | null;
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

export default function TaskCard({ task }: { task: Task }) {
  const [editing, setEditing] = useState(false);

  // The server can't know your device's date, so "today" is filled in once the
  // page is in your browser. Until then, nothing is marked overdue.
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => setToday(todayOnThisDevice()), []);

  const overdue =
    !task.done && task.due_date !== null && today !== null && task.due_date < today;

  if (editing) {
    return (
      <li className="task-card editing">
        <form
          action={async (formData) => {
            await updateTask(formData);
            setEditing(false);
          }}
        >
          <input type="hidden" name="id" value={task.id} />
          <TaskFields
            idPrefix={`edit-${task.id}`}
            title={task.title}
            skill={task.skill}
            className={task.class_name ?? ""}
            dueDate={task.due_date ?? ""}
          />
          <div className="card-actions">
            <button
              type="button"
              className="button-secondary"
              onClick={() => setEditing(false)}
            >
              <X size={16} aria-hidden /> Cancel
            </button>
            <button type="submit">
              <Check size={16} aria-hidden /> Save
            </button>
          </div>
        </form>
      </li>
    );
  }

  const classes = ["task-card"];
  if (task.done) classes.push("done");
  if (overdue) classes.push("overdue");

  return (
    <li className={classes.join(" ")}>
      <form action={setTaskDone}>
        <input type="hidden" name="id" value={task.id} />
        {/* Clicking sends the opposite of the current state. */}
        <input type="hidden" name="done" value={task.done ? "" : "on"} />
        <button
          type="submit"
          className="icon-button check-button"
          aria-label={
            task.done
              ? `Mark "${task.title}" not done`
              : `Mark "${task.title}" done`
          }
        >
          {task.done ? <CircleCheck size={22} /> : <Circle size={22} />}
        </button>
      </form>

      <div className="card-body">
        <p className="card-title">{task.title}</p>
        <div className="card-meta">
          <span className="chip chip-skill">{task.skill}</span>
          {task.class_name && (
            <span className="chip">
              <GraduationCap size={14} aria-hidden /> {task.class_name}
            </span>
          )}
          {task.due_date && (
            <span className="chip chip-date">
              <Calendar size={14} aria-hidden /> Due{" "}
              {formatDueDate(task.due_date)}
            </span>
          )}
          {overdue && (
            <span className="chip chip-overdue">
              <CircleAlert size={14} aria-hidden /> Overdue
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="icon-button"
        aria-label={`Edit "${task.title}"`}
        onClick={() => setEditing(true)}
      >
        <Pencil size={18} />
      </button>
    </li>
  );
}
