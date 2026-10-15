import { SKILLS } from "./skills";

// The title, skill, class and due date inputs, shared by the Add form and
// the Edit form so both always ask for the same things.
export default function TaskFields({
  idPrefix,
  title = "",
  skill = "",
  className = "",
  dueDate = "",
}: {
  idPrefix: string;
  title?: string;
  skill?: string;
  className?: string;
  dueDate?: string;
}) {
  return (
    <div className="field-grid">
      <div className="field field-wide">
        <label htmlFor={`${idPrefix}-title`}>Task</label>
        <input
          id={`${idPrefix}-title`}
          name="title"
          type="text"
          maxLength={200}
          required
          defaultValue={title}
          placeholder="Read one news article"
        />
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-skill`}>Skill</label>
        <select
          id={`${idPrefix}-skill`}
          name="skill"
          required
          defaultValue={skill}
        >
          <option value="" disabled>
            Choose a skill
          </option>
          {SKILLS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-class`}>Class (optional)</label>
        <input
          id={`${idPrefix}-class`}
          name="class_name"
          type="text"
          maxLength={50}
          defaultValue={className}
          placeholder="SLS 480E"
        />
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-due`}>Due date (optional)</label>
        <input
          id={`${idPrefix}-due`}
          name="due_date"
          type="date"
          defaultValue={dueDate}
        />
      </div>
    </div>
  );
}
