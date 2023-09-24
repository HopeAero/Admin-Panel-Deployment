import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Movement, MovementPayload } from 'services/movements/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/movements`;

export default async function editMovement(idMovement: number, body: MovementPayload): Promise<Movement> {
  try {
    const response = await axios.put<Movement>(
        `${URL}/${idMovement}`, body, {
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
