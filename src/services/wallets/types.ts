export interface Wallet {
  walletId: number;
  description: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export type WalletPayload = Omit<Wallet, 'walletId' | 'balance' | 'createdAt' | 'updatedAt'>;
