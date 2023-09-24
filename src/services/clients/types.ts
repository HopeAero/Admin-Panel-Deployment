export interface Client {
  clientId: number;
  name: string;
  mainPhone: string;
  secondaryPhone: string;
  createdAt: string;
}

export type ClientPayload = Omit<Client, 'clientId' | 'createdAt'>;
