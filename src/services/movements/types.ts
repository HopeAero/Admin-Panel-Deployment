export interface Movement {
  movementId: number;
  description: string;
  amount: number;
  walletId: number;
  createdAt: string;
}

export type MovementPayload = Omit<Movement, 'movementId' | 'createdAt'>;
