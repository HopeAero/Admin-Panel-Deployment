import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Skill } from 'services/skills/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import { PaginateBody, PaginatedResponse } from 'services/types';
import store from 'store';

const URL = `${API_BASE_URL}/skills`;

export default async function getPaginate(body: PaginateBody): Promise<SkillPaginatedResponse> {
  try {
    const response = await axios.get<SkillPaginatedResponse>(
      addQueryParams(URL, body), {
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

export type SkillPaginatedResponse = PaginatedResponse<Skill>;
