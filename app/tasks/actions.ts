"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { SKILLS } from "./skills";

export async function addTask(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const skill = String(formData.get("skill") ?? "");

  if (!title) {
    redirect("/tasks?error=" + encodeURIComponent("Type a task first."));
  }
  if (!(SKILLS as readonly string[]).includes(skill)) {
    redirect("/tasks?error=" + encodeURIComponent("Choose a skill."));
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("tasks")
    .insert({ title, skill, user_id: user.id });

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
