import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Admin, AdminPayload } from 'services/admins/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/admins`;

export default async function createAdmin(body: AdminPayload): Promise<Admin> {
  try {
    const response = await axios.post<Admin>(
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
