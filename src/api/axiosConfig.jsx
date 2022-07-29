import axios from "axios";
import { message } from "antd";
import { API_URL } from "./api";
import responsiveObserve from "antd/lib/_util/responsiveObserve";
const axiosConfig = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
  },
  paramsSerializer: (params) => new URLSearchParams({ params }),
});

axiosConfig.interceptors.request.use(async (config) => {
  const customHeaders = {};

  const auth = localStorage.getItem('Bearer');
  // console.log(auth)
  // let stringParse = JSON.parse(auth);
  // const accessToken = JSON.parse(stringParse.auth).token;
  if (auth) {
    customHeaders.Authorization = auth;
  }
  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  };
});
axiosConfig.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data ;
    }
    return response;
  },
  (error) => {
    // Handle errors
    const { config, data } = error.response;
    if (error.message) {
      throw error.message;
    }
    message.error(error.error);
    if (error.response?.status === 401) {
      localStorage.clear();
    }
    if (error.response?.status === 404) {
       localStorage.clear();
    }
    throw error;
  }
);
export default axiosConfig;
