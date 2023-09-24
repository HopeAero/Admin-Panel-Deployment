import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Skill } from 'services/skills/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/skills/all/category`;

export default async function getAllSkills(idSkillCategory: number): Promise<Skill[]> {
  try {
    const response = await axios.get<Skill[]>(
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
