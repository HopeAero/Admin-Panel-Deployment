export interface Application {
  publicationId: number;
  userId: string;
  isAccepted: string;
  description: string;
  createdAt: string;
  udpatedAt: string;
}

export type ApplicationPayload = Omit<Application, 'publicationId' | 'userId' | 'updatedAt' | 'createdAt'>;
