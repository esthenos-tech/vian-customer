import { postAPICall } from "../axiosMethodCall";
// import { toast } from "react-toastify";

import { userReportUrl } from "../../urlConfiguration";

export const sendReports = async (payload) => {
  try {
    const response = await postAPICall(userReportUrl, payload);
    return response;
  } catch (error) {
    return error;
  }
};
