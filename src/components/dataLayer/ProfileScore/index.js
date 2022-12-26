import { postAPICall } from "../axiosMethodCall";

import { profileScoreUrl } from "../../urlConfiguration";

export const sendProfileScoreReport = async (type, payload) => {
  try {
    const response = await postAPICall(profileScoreUrl, payload);
    return response;
  } catch (error) {
    return error;
  }
};
