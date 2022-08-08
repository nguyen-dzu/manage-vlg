import { API_CONFIG } from "./api";
import axiosConfig from "./axiosConfig";

export default {
  getRoles: () => {
    return axiosConfig.get(API_CONFIG.ROLES.GET_ROLES);
  },
  getUser: (postList, roleId) => {
    return axiosConfig.get(
      API_CONFIG.USER_CUSTOMER.GET_CUSTOMER(postList, roleId)
    );
  },
  getCustomerId: (id) => {
    return axiosConfig.get(
      API_CONFIG.USER_CUSTOMER.GER_FOR_ID(id)
    );
  },
  activeUser: (param) => {
    return axiosConfig.put(API_CONFIG.USER_CUSTOMER.ACTIVE, param);
  },
  createCustomer: (param) => {
    return axiosConfig.post(API_CONFIG.USER_CUSTOMER.CREATE_CUSTOMER, param);
  },
  getRestaurant: (postList) => {
    return axiosConfig.get(API_CONFIG.RESTAURANT.GET_ALL(postList));
  },
  createRestaurant: (param) => {
    return axiosConfig.post(API_CONFIG.RESTAURANT.CREATE_RESTAURNT, param);
  },
  updateRestaurant: (id, param) => {
    return axiosConfig.put(API_CONFIG.RESTAURANT.UPDATE_RESTAURANT(id), param);
  },
  getRestaurantId: (id) => {
    return axiosConfig.get(API_CONFIG.RESTAURANT.GER_FOR_ID(id));
  },
  deleteRestaurant: (id) => {
    return axiosConfig.delete(API_CONFIG.RESTAURANT.DELETE_RESTAURANT(id));
  },
  getApproveRestaurant: (postList) => {
    return axiosConfig.get(API_CONFIG.APPROVE.GET_RESTAURANT(postList));
  },
  getApproveShipper: (postList) => {
    return axiosConfig.get(API_CONFIG.APPROVE.GET_SHIPPER(postList));
  },
  ApproveRestaurant: (id) => {
    return axiosConfig.get(API_CONFIG.APPROVE.APPROVE_RESTAURANT(id));
  },
  ApproveShiper: (id) => {
    return axiosConfig.get(API_CONFIG.APPROVE.APPROVE_SHIPPER(id));
  },
  getProductRes: (postList) => {
    return axiosConfig.get(API_CONFIG.RESTAURANT._GET_PRODUCT(postList))
  },
  createProduct: (param) => {
    return axiosConfig.post(API_CONFIG.RESTAURANT._CREATE_PRODUCT, param)
  },
  activeRestaurant: (id, param) => {
    return axiosConfig.put(API_CONFIG.RESTAURANT.ACTIVE_RES(id), param);
  },
  getOrder: ()=>{
    return axiosConfig.get(API_CONFIG.RESTAURANT.GET_ORDER);
  },
  getRestaurantProfile: () => {
    return axiosConfig.get(API_CONFIG.RESTAURANT.GET_RESTAURANTPROFILE)
  }
};
