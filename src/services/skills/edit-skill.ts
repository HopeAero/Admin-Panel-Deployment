import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Skill, SkillPayload } from 'services/skills/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/skills`;

export default async function editSkill(idSkill: number, body: SkillPayload): Promise<Skill> {
  try {
    const response = await axios.put<Skill>(
        `${URL}/${idSkill}`, body, {
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
