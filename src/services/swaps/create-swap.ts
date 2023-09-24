import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Swap, SwapPayload } from 'services/swaps/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/swaps`;

export default async function createSwap(body: SwapPayload): Promise<Swap> {
  try {
    const response = await axios.post<Swap>(
        URL, body, {
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
