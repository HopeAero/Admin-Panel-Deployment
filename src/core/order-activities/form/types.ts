import { ChangeEvent } from "react";
import { OrderDetailPayload } from "../types";

export type LocalOrderActivity = Omit<OrderDetailPayload, 'orderId'>;

export type ChangeEventOrderActivities = ChangeEvent<{
  value: OrderDetailPayload[]
}>;
