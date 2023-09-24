import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Application } from 'services/applications/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/applications`;

export default async function getApplication(idApplication: number): Promise<Application> {
  try {
    const response = await axios.get<Application>(
        `${URL}/${idApplication}`, {
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
