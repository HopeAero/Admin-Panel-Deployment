import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Wallet, WalletPayload } from 'services/wallets/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/wallets`;

export default async function editAdmin(idWallet: number, body: WalletPayload): Promise<Wallet> {
  try {
    const response = await axios.put<Wallet>(
        `${URL}/${idWallet}`, body, {
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
