import {
  getLeadsFormData,
  getLeadsPersonalDetails,
  postUpdateLeadsData,
} from "../../urlConfiguration";
import { getAPICall, postAPICall } from "../axiosMethodCall";

// get perticular Lead list of all Leads
export const searchLeadsFilterFormData = async (type) => {
  try {
    const url = getLeadsFormData(type);
    const response = await getAPICall(url);
    return response;
  } catch (error) {
    return error;
  }
};

// update Leads form data
export const submitUpdateLeadsReassign = async (type, payload) => {
  try {
    const url = postUpdateLeadsData(type);
    const response = await postAPICall(url, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

//get app leads form data
export const getAllLeadsPersonalDetails = async (type) => {
  try {
    const url = getLeadsPersonalDetails(type);
    const response = await postAPICall(url);
    return response.data;
  } catch (error) {
    return error;
  }
};
