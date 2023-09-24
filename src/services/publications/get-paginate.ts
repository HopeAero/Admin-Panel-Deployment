import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Publication } from 'services/publications/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import { PaginateBody, PaginatedResponse } from 'services/types';
import store from 'store';

const URL = `${API_BASE_URL}/publications`;

export default async function getPaginate(body: PaginateBody): Promise<PublicationPaginatedResponse> {
  try {
    const response = await axios.get<PublicationPaginatedResponse>(
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

export type PublicationPaginatedResponse = PaginatedResponse<Publication>;
