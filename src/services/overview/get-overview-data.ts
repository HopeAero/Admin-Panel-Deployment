import axios from "axios";
// Own
import store from "store";
import { API_BASE_URL } from "config/constants";
import { OverviewDataResponse } from "./types";
import BackendError from "exceptions/backend-error";
import addQueryParams from "services/add-query-params";

const URL = `${API_BASE_URL}/overview`;

export default async function getOverviewData(): Promise<OverviewDataResponse> {
  try {
    const urlParametrized = addQueryParams(URL, {});
    const response = await axios.get(urlParametrized, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new BackendError(error);
  }
}
