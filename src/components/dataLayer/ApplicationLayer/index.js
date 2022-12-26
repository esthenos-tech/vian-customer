import { getAPICall, postAPICall, putAPICall } from "../axiosMethodCall";
import {
  applicationCustomerUrl,
  getCaptainDetailsUrl,
  getApplicationDataUrl,
  getSangamData,
  getBreResults,
  getStatusFilterData,
  postUpdateFormData,
  putUpdateApplicationForm,
  getCashFLowResults,
  getBalanceSheetResults,
  getAssessmentSheetResults,
} from "../../urlConfiguration";
import { toast } from "react-toastify";
//API for fitst branch table
export const createFilterFormData = async (payload) => {
  try {
    const response = await getAPICall(applicationCustomerUrl, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};
// second table with Captain/RM details
export const getCaptainListDetails = async (type) => {
  try {
    const url = getCaptainDetailsUrl(type);
    const response = await getAPICall(url);
    return response;
  } catch (error) {
    return error;
  }
};
// perticular branch list of all applications
export const getSngamListDetails = async (type, payload) => {
  try {
    const url = getSangamData(type);
    const response = await getAPICall(url, payload);
    return response;
  } catch (error) {
    return error;
  }
};
// api for all application details
export const getApplicationDetails = async (type) => {
  try {
    const url = getApplicationDataUrl(type);
    const response = await getAPICall(url);
    return response;
  } catch (error) {
    return error;
  }
};

// Api for breResults in application
export const getBreResultsDetails = async (type) => {
  try {
    const url = getBreResults(type);
    const response = await getAPICall(url);
    return response;
  } catch (error) {
    return error;
  }
};

// Api for cash flow in application
export const getCashFlowResult = async (type) => {
  try {
    const url = getCashFLowResults(type);
    const response = await getAPICall(url);
    return response;
  } catch (error) {
    return error;
  }
};

// Api for Balance Sheet in application
export const getBalanceSheetResult = async (type) => {
  try {
    const url = getBalanceSheetResults(type);
    const response = await getAPICall(url)
      .then((response) => {
        if (response && response.data) {
          toast.success(response?.data?.message);
        }
        return response;
      })
      .catch((error) => {
        if (error.response.data) {
          toast.error(error.response.data.results);
        }

        return error;
      });
    return response;
  } catch (error) {
    return error;
  }
};

// Api for Accessment Sheet in application
export const getAssessmentSheetResult = async (type) => {
  try {
    const url = getAssessmentSheetResults(type);
    const response = await getAPICall(url)
      .then((response) => {
        if (response && response.data) {
          toast.success(response?.data?.message);
        }
        return response;
      })
      .catch((error) => {
        if (error.response.data) {
          toast.error(error.response.data.results);
        }

        return error;
      });
    return response;
  } catch (error) {
    return error;
  }
};
//API for status   table
export const getteStatusDropdown = async (payload) => {
  try {
    const response = await getAPICall(getStatusFilterData);
    return response.data;
  } catch (error) {
    return error;
  }
};

// update application
export const submitUpdateFormData = async (type, payload) => {
  try {
    const url = postUpdateFormData(type);
    const response = await postAPICall(url, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};

// get Rejection DropDown API
export const putUpdateApplicationAllFormData = async (id, payload) => {
  try {
    const url = putUpdateApplicationForm(id);
    const response = await putAPICall(url, payload);
    return response.data;
  } catch (error) {
    return error;
  }
};
