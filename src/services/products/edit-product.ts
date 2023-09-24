import axios from "axios";
// Own
import BackendError from "exceptions/backend-error";
import { API_BASE_URL } from "config/constants";
import { Product } from "services/products/types";
import store from "store";
import { ProductPayload } from "./types";

const URL = `${API_BASE_URL}/products`;

export default async function editProduct(
  productId: number,
  body: ProductPayload
): Promise<Product> {
  try {
    const response = await axios.put<Product>(`${URL}/${productId}`, body, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
