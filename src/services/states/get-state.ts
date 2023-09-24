import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { State } from 'core/states/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/states`;

export default async function getState(idState: number): Promise<State> {
  try {
    const response = await axios.get<State>(
        `${URL}/${idState}`, {
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

