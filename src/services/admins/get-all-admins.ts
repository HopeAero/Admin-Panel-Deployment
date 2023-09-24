import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Admin } from 'services/admins/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/admins/all`;

export default async function getAllAdmins(): Promise<Admin[]> {
  try {
    const response = await axios.get<Admin[]>(
      URL, {
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
