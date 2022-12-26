import { getAPICall, postAPICall, putAPICall } from "../axiosMethodCall";
import { toast } from "react-toastify";
import {
  getProductsDetails,
  getProductsCategoryDetails,
  getParticularProductDetail,
} from "../../urlConfiguration";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const createOgranisationProductCreation = async (payload) => {
  try {
    const response = await postAPICall(getProductsDetails, payload)
      .then((response) => {
        if (response && response.data.message) {
          toast.success(response.data.message);
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          toast.error(error.response.data.message);
        }
        return error;
      });
    return response;
  } catch (error) {
    return toast.error("Something went wrong..", error);
  }
};

export const createOgranisationProductCategoryCreation = async (payload) => {
  try {
    const response = await postAPICall(getProductsCategoryDetails, payload)
      .then((response) => {
        if (response && response.data.message) {
          toast.success(response.data.message);
        }
        return response.data;
      })
      .catch((error) => {
        debugger;
        if (error && error?.response) {
          toast.error(error.response.data.message);
        }
      });
  } catch (errors) {
    return toast.error("Something went wrong...", errors);
  }
};

export const getAllProductsDetails = async () => {
  try {
    const response = await getAPICall(getProductsDetails)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (
          error &&
          error?.response &&
          error?.response?.data &&
          error?.response?.data?.message
        ) {
          toast.error(error?.response?.data?.message);
        }
        cookies.remove("user");
        return error;
      });
    return response;
  } catch (error) {
    return toast.error("Something went wrong...", error);
  }
};

export const getAllProductsCategoryDetails = async () => {
  try {
    const response = await getAPICall(getProductsCategoryDetails)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (
          error &&
          error?.response &&
          error?.response?.data &&
          error?.response?.data?.message
        ) {
          toast.error(error?.response?.data?.message);
        }
        cookies.remove("user");
        return error;
      });
    return response;
  } catch (error) {
    console.log(error);

    if (error && error.message) {
      toast.error(error.message);
    }

    return toast.error("Something went wrong...", error);
  }
};

export const getProductsPerticularDetails = async (id) => {
  try {
    const url = getParticularProductDetail(id);
    const response = await getAPICall(url);
    return response;
  } catch (error) {
    if (error?.response?.status) {
      toast.error(error?.response?.data?.message);
      return error?.response;
    }
    cookies.remove("user");
    return error;
  }
};
export const updateProductsPerticularDetails = async (id, payload) => {
  try {
    const url = getParticularProductDetail(id);
    const response = await putAPICall(url, payload)
      .then((response) => {
        if (response && response.data) {
          toast.success(response?.data?.message);
        }
        return response.data;
      })
      .catch((error) => {
        if (error.response.data.errors.activation_date) {
          toast.error(error.response.data.errors.activation_date[0]);
        }
        if (error.response.data.errors.deactivation_date) {
          toast.error(error.response.data.errors.deactivation_date[0]);
        }

        return error;
      });
    return response;
  } catch (error) {
    return error;
  }
};
