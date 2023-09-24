import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { SkillCategory } from 'services/skill-categories/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import { PaginateBody, PaginatedResponse } from 'services/types';
import store from 'store';

const URL = `${API_BASE_URL}/skill-categories`;

export default async function getPaginate(body: PaginateBody): Promise<SkillCategoryPaginatedResponse> {
  try {
    const response = await axios.get<SkillCategoryPaginatedResponse>(
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

export type SkillCategoryPaginatedResponse = PaginatedResponse<SkillCategory>;
