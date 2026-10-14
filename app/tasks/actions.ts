"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { SKILLS } from "./skills";

// Reads the optional due date from a form. An empty box means "no due date".
// Returns undefined if the text is not a real YYYY-MM-DD date.
function readDueDate(formData: FormData): string | null | undefined {
  const value = String(formData.get("due_date") ?? "").trim();
  if (!value) return null;
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : undefined;
}

export async function addTask(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const skill = String(formData.get("skill") ?? "");
  const dueDate = readDueDate(formData);

  if (!title) {
    redirect("/tasks?error=" + encodeURIComponent("Type a task first."));
  }
  if (!(SKILLS as readonly string[]).includes(skill)) {
    redirect("/tasks?error=" + encodeURIComponent("Choose a skill."));
  }
  if (dueDate === undefined) {
    redirect("/tasks?error=" + encodeURIComponent("That due date is not valid."));
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("tasks")
    .insert({ title, skill, due_date: dueDate, user_id: user.id });

  if (error) {
    redirect("/tasks?error=" + encodeURIComponent("Could not add the task."));
  }

  revalidatePath("/tasks");
  redirect("/tasks");
}

export async function setTaskDone(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const done = formData.get("done") === "on";

  const supabase = await createClient();
  // Row level security makes sure this only changes the signed-in user's own task.
  const { error } = await supabase.from("tasks").update({ done }).eq("id", id);

  if (error) {
    redirect("/tasks?error=" + encodeURIComponent("Could not save the tick."));
  }

  revalidatePath("/tasks");
}

export async function setDueDate(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const dueDate = readDueDate(formData);

  if (dueDate === undefined) {
    redirect("/tasks?error=" + encodeURIComponent("That due date is not valid."));
  }

  const supabase = await createClient();
  // Row level security makes sure this only changes the signed-in user's own task.
  const { error } = await supabase
    .from("tasks")
    .update({ due_date: dueDate })
    .eq("id", id);

  if (error) {
    redirect("/tasks?error=" + encodeURIComponent("Could not save the due date."));
  }

  revalidatePath("/tasks");
}
