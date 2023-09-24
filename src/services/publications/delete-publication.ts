import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/publications`;

export default async function deletePublication(idPublication: number): Promise<void> {
  try {
    await axios.delete(
        `${URL}/${idPublication}`, {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
