export interface Admin {
  adminId: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export type AdminPayload = Omit<Admin, 'adminId' | 'createdAt'>;
