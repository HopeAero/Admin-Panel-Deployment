export type OrderActivity = {
  orderId: number;
  serviceId: number;
  activityId: number;
  employeeName: string;
  activityDescription: string;
  employeeDni: string;
  costHour: number;
  hoursTaken: number;
  createdAt: string;
}

export interface InputOrderActivity {
  orderId: number;
  serviceId: number;
  activityId: number;
  employeeDni: string;
  hoursTaken: number;
};

export type OrderDetail = {
  orderId: number;
  productId: number;
  name?: string;
  quantity: number;
  price: number;
  createdAt: string;
}

export interface OrderDetailPayload {
  orderId: number;
  productId: number;
  quantity: number;
}

export interface LocalOrderActivity extends Omit<OrderActivity, 'orderId'>{};

export interface LocalOrderDetail extends Omit<OrderDetail, 'orderId' | 'createdAt'>{};
