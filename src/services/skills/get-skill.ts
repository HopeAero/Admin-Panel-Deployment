import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Skill } from 'services/skills/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/skills`;

export default async function getSkill(idSkill: number): Promise<Skill> {
  try {
    const response = await axios.get<Skill>(
        `${URL}/${idSkill}`, {
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

