import { getAPICall, postAPICall } from "../axiosMethodCall";
import {
  feesCollectionUrl,
  postfeesCollectionUrl,
} from "../../urlConfiguration";

export const feesCollectionData = async (payload) => {
  try {
    const response = await getAPICall(feesCollectionUrl, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const submitFeesCollectionData = async (payload) => {
  try {
    const response = await postAPICall(postfeesCollectionUrl, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};
