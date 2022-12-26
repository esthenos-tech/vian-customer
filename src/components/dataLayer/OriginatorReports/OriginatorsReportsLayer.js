import { getAPICall, postAPICall } from "../axiosMethodCall";
import { reportsPartners } from "../../urlConfiguration";
import { reportUrl } from "../../urlConfiguration";
import { toast } from "react-toastify";

export const sendReports = async (type, payload) => {
  try {
    const url = reportUrl(type);
    const response = await postAPICall(url, payload);
    return response;
  } catch (error) {
    debugger;
    console.log(error);
    return error;
  }
};

export const getReportsPartners = async () => {
  try {
    const response = await getAPICall(reportsPartners);
    return response;
  } catch (error) {
    return error;
  }
};
