import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { SkillCategory } from 'services/skill-categories/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/skill-categories/all`;

export default async function getAllSkillCategories(): Promise<SkillCategory[]> {
  try {
    const response = await axios.get<SkillCategory[]>(
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
