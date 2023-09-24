import axios from 'axios';
// Own
import { API_BASE_URL } from 'config/constants';
import { Employee } from 'core/employees/types';
import BackendError from 'exceptions/backend-error';
import store from 'store';

const URL = `${API_BASE_URL}/employees`;

export default async function deleteEmployee(employeeDni: string): Promise<Employee> {
  try {
    const response = await axios.delete<Employee>(
      `${URL}/${employeeDni}`, {
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

export type EmployeePayload = Omit<Employee, 'employeeDni' | 'createdAt'>;
