"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { SKILLS } from "./skills";

function fail(message: string): never {
  redirect("/tasks?error=" + encodeURIComponent(message));
}

// Reads and checks the fields shared by the Add form and the Edit form.
// Sends the user back with an error message if anything is not valid.
function readTaskFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const skill = String(formData.get("skill") ?? "");
  const className = String(formData.get("class_name") ?? "").trim();
  const dueDate = String(formData.get("due_date") ?? "").trim();

  if (!title) fail("Type a task first.");
  if (title.length > 200) fail("Keep the task under 200 characters.");
  if (!(SKILLS as readonly string[]).includes(skill)) fail("Choose a skill.");
  if (className.length > 50) fail("Keep the class name under 50 characters.");
  if (dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate)) {
    fail("That due date is not valid.");
  }

  return {
    title,
    skill,
    class_name: className || null, // empty box means "no class"
    due_date: dueDate || null, // empty box means "no due date"
  };
}

export async function addTask(formData: FormData) {
  const fields = readTaskFields(formData);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("tasks")
    .insert({ ...fields, user_id: user.id });

  if (error) fail("Could not add the task.");

  revalidatePath("/tasks");
  redirect("/tasks");
}

export async function updateTask(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const fields = readTaskFields(formData);

  const supabase = await createClient();
  // Row level security makes sure this only changes the signed-in user's own task.
  const { error } = await supabase.from("tasks").update(fields).eq("id", id);

  if (error) fail("Could not save your changes.");

  revalidatePath("/tasks");
}

export async function setTaskDone(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const done = formData.get("done") === "on";

  const supabase = await createClient();
  // Row level security makes sure this only changes the signed-in user's own task.
  const { error } = await supabase.from("tasks").update({ done }).eq("id", id);

  if (error) fail("Could not save the tick.");

  revalidatePath("/tasks");
}
