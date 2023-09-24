export interface SkillCategory {
  skillCategoryId: number;
  name: string;
  createdAt: string;
}

export type SkillCategoryPayload = Omit<SkillCategory, 'skillCategoryId' | 'createdAt'>;
