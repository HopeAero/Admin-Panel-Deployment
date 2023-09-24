import { LocalOrderDetail, OrderDetail, OrderDetailPayload } from "../../types";

type LocalOrderActivityType = LocalOrderDetail | OrderDetailPayload | OrderDetail;

export default function convertLocalToOrderActivitysInput(
  orderId: number, products: LocalOrderActivityType[]
): OrderDetailPayload[] {
  return products.map(
    (orderActivity: LocalOrderActivityType) =>
      convertLocalToOrderActivityInput(orderId, orderActivity)
  );
}

export function convertLocalToOrderActivityInput(
  orderId: number, product: LocalOrderActivityType
): OrderDetailPayload {
  return ({
    productId: +product.productId,
    quantity: +product.quantity,
    orderId,
  });
}
