import { getAPICall, putAPICall } from "../axiosMethodCall";
import { organisationSettingsUrl } from "../../urlConfiguration";

export const getOgranisationSettings = async () => {
  try {
    const response = await getAPICall(organisationSettingsUrl);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateOrganisationSettings = async (payload) => {
  try {
    const response = await putAPICall(organisationSettingsUrl, payload);
    return response;
  } catch (error) {
    return error;
  }
};
