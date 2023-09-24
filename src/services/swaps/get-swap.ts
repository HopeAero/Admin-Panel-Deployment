import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Swap } from 'services/swaps/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/swaps`;

export default async function getSwap(idSwap: number): Promise<Swap> {
  try {
    const response = await axios.get<Swap>(
        `${URL}/${idSwap}`, {
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

