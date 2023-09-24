export interface Publication {
  publicationId: number;
  name: string;
  description: string;
  applicationDescription: string;
  difficulty: number;
  status: string;
  userLeadId: number;
  createdAt: string;
  udpatedAt: string;
}

export type PublicationPayload = Omit<Publication, 'publicationId' | 'userLeadId' | 'updatedAt' | 'createdAt'>;
