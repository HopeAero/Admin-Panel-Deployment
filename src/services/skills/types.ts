export interface Skill {
  skillCategoryId: number;
  skillId: number;
  name: string;
  createdAt: string;
}

export type SkillPayload = Omit<Skill, 'skillId' | 'createdAt'>;
