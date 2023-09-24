import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { SkillCategory, SkillCategoryPayload } from 'services/skill-categories/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/skill-categories`;

export default async function editSkillCategory(idSkillCategory: number, body: SkillCategoryPayload): Promise<SkillCategory> {
  try {
    const response = await axios.put<SkillCategory>(
        `${URL}/${idSkillCategory}`, body, {
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
