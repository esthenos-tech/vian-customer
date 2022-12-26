import { getAPICall, postAPICall } from "../axiosMethodCall";

import { toast } from "react-toastify";

import {
  CSVDumpAllUrl,
  getPerticularFileUploadTabledataUrl,
} from "../../urlConfiguration";

export const postOrganisationSCV = async (payload) => {
  try {
    const response = await postAPICall(CSVDumpAllUrl, payload);

    if (response && response.data.message) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getPerticularTableData = async (payload) => {
  try {
    const response = await getAPICall(
      getPerticularFileUploadTabledataUrl,
      payload
    );
    return response;
  } catch (error) {
    return error;
  }
};
