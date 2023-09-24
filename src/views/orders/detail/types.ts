import { Order } from 'services/orders/types';

export interface Props {
  className?: string;
  order: Order;
  onRefresh: () => void;
}
