import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Wallet } from 'services/wallets/types';
import BackendError from 'exceptions/backend-error';
import addQueryParams from 'services/add-query-params';
import { PaginateBody, PaginatedResponse } from 'services/types';
import store from 'store';

const URL = `${API_BASE_URL}/wallets`;

export default async function getPaginate(body: PaginateBody): Promise<WalletPaginatedResponse> {
  try {
    const response = await axios.get<WalletPaginatedResponse>(
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

export type WalletPaginatedResponse = PaginatedResponse<Wallet>;
