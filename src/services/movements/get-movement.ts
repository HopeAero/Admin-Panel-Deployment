import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Movement } from 'services/movements/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/movements`;

export default async function getMovement(idMovement: number): Promise<Movement> {
  try {
    const response = await axios.get<Movement>(
        `${URL}/${idMovement}`, {
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

