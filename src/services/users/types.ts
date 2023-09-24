export interface User {
  userId: number;
  name: string;
  email: string;
  role: string;
  occupation: string;
  personalDescription?: string;
  createdAt: string;
}

export type UserPayload = Omit<User, 'userId' | 'createdAt'>;
