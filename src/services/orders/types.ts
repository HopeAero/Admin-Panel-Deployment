import { InvoiceItem } from "components/InvoiceTable";
import { LocalOrderDetail, OrderDetail } from "core/order-activities/types";

export interface Order {
  orderId: number;
  clientId: number;
  walletId: number;
  adminId: number;
  isClosed?: boolean;
  clientName?: string;
  totalAmount?: number;
  items: InvoiceItem[];
  orderDetails: OrderDetail[];
  createdAt: string;
}

export type OrderPayload = Omit<Order, 'orderId' | 'createdAt' | 'items' | 'orderDetails'> & {
  products: LocalOrderDetail[];
};

export type OrderEditPayload = Pick<Order, 'clientId' | 'walletId'>;
