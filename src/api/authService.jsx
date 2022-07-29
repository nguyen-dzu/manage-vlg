import { API_CONFIG } from "./api";
import axiosConfig from "./axiosConfig";

export default {
  login: (body) => {
    return axiosConfig.post(API_CONFIG.AUTH.LOGINADMIN, body);
  },
  getInfo: () => {
    return axiosConfig.get(API_CONFIG.AUTH.GET_INFO);
  },
};
