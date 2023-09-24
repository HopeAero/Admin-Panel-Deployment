export interface Swap {
  swapId: number;
  amount: number;
  source: number;
  destination: number;
  createdAt: string;
}

export type SwapPayload = Omit<Swap, 'swapId' | 'createdAt'>;
