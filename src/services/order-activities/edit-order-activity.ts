import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Service } from 'core/services/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/orders-details`;

export default async function editOrderDetail(
  orderId: number,
  productId: number,
  body: OrderDetailUpdatePayload
):
  Promise<Service>
{
  try {
    const response = await axios.put<Service>(
      `${URL}/orders/${orderId}/product/${productId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}

export interface OrderDetailUpdatePayload {
  quantity: number;
};
