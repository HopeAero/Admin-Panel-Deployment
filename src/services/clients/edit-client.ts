import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Client, ClientPayload } from 'services/clients/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/clients`;

export default async function editClient(clientId: number, body: ClientPayload): Promise<Client> {
  try {
    const response = await axios.put<Client>(
        `${URL}/${clientId}`, body, {
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
