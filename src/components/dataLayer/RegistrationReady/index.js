import { searchReadyFormDataUrl } from "../../urlConfiguration";
import { getAPICall } from "../axiosMethodCall";

export const createFilterRegistrationReadyFormData = async (type, payload) => {
  try {
    const url = searchReadyFormDataUrl(type);
    const response = await getAPICall(url, payload);
    return response;
  } catch (error) {
    return error;
  }
};
