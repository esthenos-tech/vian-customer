import { getAPICall } from "../axiosMethodCall";
import { disbursementUrl, postDisburseData } from "../../urlConfiguration";

export const getDisbursementData = async (payload) => {
  try {
    const response = await getAPICall(disbursementUrl, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const postDisbursementData = async (payload) => {
  try {
    const url = postDisburseData(payload);
    const response = await getAPICall(url);
    return response.data;
  } catch (error) {
    return error;
  }
};
