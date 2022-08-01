import axiosConfig from "./axiosConfig";

export const API_URL = "http://localhost:8500/api";
export const API_CONFIG = {
  AUTH: {
    LOGINADMIN: `/Users/Login`,
    GET_INFO: `/Users/Profile`,
  },
  ROLES: {
    GET_ROLES: `/Roles`
  },
  USER_CUSTOMER : {
    ACTIVE: `/Users/Active`,
    CREATE_CUSTOMER: `/Users`,
    GET_CUSTOMER:(postList, roleId) =>  `/Users?RoleId=${roleId}&PageSize=${postList.pageSize}&Current=${postList.current}`,
    GER_FOR_ID:(id)=> `/Users/${id}`,
  },
  RESTAURANT: {
    GET_ALL:(postList) => `Restaurants?PageSize=${postList.pageSize}&Current=${postList.current}`,
    CREATE_RESTAURNT:`/Restaurants`,  
    GER_FOR_ID:(id)=> `/Restaurants/${id}`,
    UPDATE_RESTAURANT:(id) => `/Restaurants/${id}`,
    DELETE_RESTAURANT: (id) => `/Restaurants/${id}`
  },
  SHIPPER : {
    GET_SHIPPER:(postList, roleId) =>  `/Users?RoleId=${roleId}&PageSize=${postList.pageSize}&Current=${postList.current}`,
  },
  APPROVE: {
    GET_RESTAURANT:(postList) =>  `/RegisterRestaurants?PageSize=${postList.pageSize}&Current=${postList.current}`,
    APPROVE_RESTAURANT: (id) => `/RegisterRestaurants/${id}/Approve`,
    GET_SHIPPER:(postList) => `/RegisterShippers?PageSize=${postList.pageSize}&Current=${postList.current}`,
    APPROVE_SHIPPER: (id) => `/RegisterShippers/${id}/Approve`,
  }
};

