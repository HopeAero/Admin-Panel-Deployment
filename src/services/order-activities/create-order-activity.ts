import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { OrderDetailPayload } from 'core/order-activities/types';
import { Service } from 'core/services/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/orders-details`;

export default async function createOrderActivity(
  body: OrderDetailPayload
): Promise<Service> {
  try {
    const response = await axios.post<Service>(
        `${URL}`, body, {
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
