import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Employee } from 'core/employees/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import { PaginateBody, PaginatedResponse } from 'services/types';
import store from 'store';

const URL = `${API_BASE_URL}/employees`;

export default async function getPaginate(body: PaginateBody, params: EmployeesPaginatorPayload): Promise<EmployeesPaginated> {
  try {
    const response = await axios.get<EmployeesPaginated>(
      addQueryParams(URL, { ...body, ...params }), {
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

export type EmployeesPaginatorPayload = { onlyForAgencyRif: string | null };
export type EmployeesPaginated = PaginatedResponse<Employee>;
