export interface Purchase {
  purchaseId: number;
  isDispatched: boolean;
  shipping: number;
  amount: number;
  totalAmount: number;
  walletId: number;
  adminId: number;
  createdAt: string;
}

export type PurchasePayload = Omit<Purchase, 'purchaseId' | 'amount' | 'totalAmount' | 'createdAt'>;
