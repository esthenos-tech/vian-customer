import { getAPICall, postAPICall } from "../axiosMethodCall";

import { getAPKTableDetailsUrl } from "../../urlConfiguration";

export const getAPKTableDetails = async (url, payload = {}) => {
  try {
    const url = getAPKTableDetailsUrl(url);
    const response = await getAPICall(url, payload);

    return response;
  } catch (error) {
    return error;
  }
};
