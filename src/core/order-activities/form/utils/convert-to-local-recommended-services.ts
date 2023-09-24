import { LocalOrderDetail } from "../../types";

type OrderDetailType = LocalOrderDetail;

export default function convertToLocalOrderActivitys(
  products: OrderDetailType[]
): LocalOrderDetail[] {
  return products.map(
        (product: OrderDetailType) => ({
          productId: +product.productId,
          name: ''+product.name,
          price: +product.price,
          quantity: +product.quantity,
        })
  );
}
