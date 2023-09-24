import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { SkillCategory } from 'services/skill-categories/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/skill-categories`;

export default async function getSkillCategory(idSkillCategory: number): Promise<SkillCategory> {
  try {
    const response = await axios.get<SkillCategory>(
        `${URL}/${idSkillCategory}`, {
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

