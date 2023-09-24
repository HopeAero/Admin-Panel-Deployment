import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Job } from 'core/jobs/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/jobs`;

export default async function getJob(idJob: number): Promise<Job> {
  try {
    const response = await axios.get<Job>(
        `${URL}/${idJob}`, {
        headers: {
          Authorization: `Bearer ${store.getState().auth.token}`,
        }
      }
    );
    return response.data;
  } catch (error: unknown) {
    throw new BackendError(error);
  }
}
