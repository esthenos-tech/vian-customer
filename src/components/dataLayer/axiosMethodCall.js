import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "instance-token": cookies.get("user"),
};

export const getAPICall = (url, data = {}) => {
  return axios.get(url, { headers, params: data });
};

export const postAPICall = (url, data = {}) => {
  return axios.post(url, data, { headers });
};

export const putAPICall = (url, data = {}) => {
  return axios.put(url, data, { headers });
};
export const deleteAPICall = (url, data = {}) => {
  return axios.delete(url, { headers }, data);
};
