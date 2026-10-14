"use client";

import { setTaskDone } from "./actions";

// A checkbox that saves as soon as it is ticked or unticked.
export default function TaskCheckbox({
  id,
  done,
  title,
}: {
  id: string;
  done: boolean;
  title: string;
}) {
  return (
    <form action={setTaskDone}>
      <input type="hidden" name="id" value={id} />
      <input
        type="checkbox"
        name="done"
        defaultChecked={done}
        aria-label={`Mark "${title}" done`}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
      />
    </form>
  );
}
