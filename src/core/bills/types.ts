import { InvoiceItem } from "components/InvoiceTable";

export interface Bill {
  billId: number;
  walletId?: number;
  discountAmount: number;
  description: string;
  subtotal: number | null;
  totalCost: number | null;
  orderId: number;
  clientName?: string;
  mainPhone?: string;
  secondaryPhone?: string;
  createdAt: string;
  items: InvoiceItem[];
}

export interface BillAlled extends Bill {
  clientId: string;
  name: string;
}
