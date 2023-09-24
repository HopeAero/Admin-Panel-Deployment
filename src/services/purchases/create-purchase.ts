import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Purchase, PurchasePayload } from 'services/purchases/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/purchases`;

export default async function createPurchase(body: PurchasePayload): Promise<Purchase> {
  try {
    const response = await axios.post<Purchase>(
        URL, {...body, adminId: store.getState().auth.user?.id}, {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
