import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Publication } from 'services/publications/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/publications`;

export default async function getPublication(idPublication: number): Promise<Publication> {
  try {
    const response = await axios.get<Publication>(
        `${URL}/${idPublication}`, {
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
