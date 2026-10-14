// The fixed list of skill tags. The database only accepts these six.
export const SKILLS = [
  "Reading",
  "Writing",
  "Listening",
  "Speaking",
  "Vocabulary",
  "Grammar",
] as const;

export type Skill = (typeof SKILLS)[number];
