import { getAPICall, postAPICall } from "../axiosMethodCall";
import { generateKitUrl } from "../../urlConfiguration";

export const generateKitFilterData = async (payload) => {
  try {
    const response = await getAPICall(generateKitUrl, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postGenerateKitData = async (payload) => {
  try {
    const response = await postAPICall(generateKitUrl, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};
