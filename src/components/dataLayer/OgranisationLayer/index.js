import { getAPICall, postAPICall } from "../axiosMethodCall";
import { organisationStatusUrl } from "../../urlConfiguration";

export const getOgranisationStatus = async () => {
  try {
    const response = await getAPICall(organisationStatusUrl);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createOgranisationStatusCreation = async (payload) => {
  try {
    const response = await postAPICall(organisationStatusUrl, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};
