import { getAPICall, postAPICall, putAPICall } from "../axiosMethodCall";
import { toast } from "react-toastify";
import {
  getEmployeeDetailsUrl,
  createEmployeeUrl,
  getParticularEmployeeUrl,
  employeePasswordUrl,
  getParticularEmployeeAccessLocationUrl,
} from "../../urlConfiguration";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const createEmployee = async (payload) => {
  try {
    const response = await postAPICall(createEmployeeUrl, payload);
    if (response && response.data.message) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getEmployeeDetails = async () => {
  try {
    const response = await getAPICall(getEmployeeDetailsUrl);
    return response;
  } catch (error) {
    if (error?.response?.status) {
      toast.error(error?.response?.data?.message);
      return error?.response;
    }
    cookies.remove("user");
  }
};

export const getParticularEmployeeDetails = async (id) => {
  try {
    const url = getParticularEmployeeUrl(id);
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

export const updateParticularEmployeeDetails = async (id, payload) => {
  try {
    const url = getParticularEmployeeUrl(id);
    const response = await putAPICall(url, payload)
      .then((response) => {
        if (response && response.data) {
          toast.success(
            "Employee updated successfully...",
            response.data.message
          );
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          toast.error(error.response.data.errors[0]);
        }
        return error;
      });
    return response;
  } catch (error) {
    return error;
  }
};

export const employeeChangePassword = async (id, payload) => {
  const url = employeePasswordUrl(id);
  await putAPICall(url, payload)
    .then((response) => {
      if (response && response.data) {
        toast.success(response.data.message);
      }
      return response.data;
    })
    .catch((error) => {
      if (error && error.response && error.response.data) {
        toast.error(error.response.data.errors[0]);
      }
      return error;
    });
};

// Perticular Employee AccessLocation URL's

export const getPerticularEmployeeAccessLocation = async (id) => {
  try {
    const url = getParticularEmployeeAccessLocationUrl(id);
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
