import axios from 'axios';
// Own
import BackendError from '../../exceptions/backend-error';
import { API_BASE_URL } from '../../config/constants';
import { CostHelper } from './types';
import store from '../../store';

const URL = `${API_BASE_URL}/products/cost-helper`;

export default async function costHelper(productId: number): Promise<CostHelper> {
  try {
    const response = await axios.get<CostHelper>(
        `${URL}/${productId}`, {
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
