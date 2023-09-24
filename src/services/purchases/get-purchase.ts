import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Purchase } from 'services/purchases/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/purchases`;

export default async function getPurchase(idPurchase: number): Promise<Purchase> {
  try {
    const response = await axios.get<Purchase>(
        `${URL}/${idPurchase}`, {
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
