import { getAPICall, postAPICall } from "../axiosMethodCall";
import { organisationUpdateLocationUrl } from "../../urlConfiguration";

export const getOgranisationUpdatedData = async () => {
  try {
    const response = await getAPICall(organisationUpdateLocationUrl);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createOgranisationUpdateDataCreation = async (payload) => {
  try {
    const response = await postAPICall(organisationUpdateLocationUrl, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};
