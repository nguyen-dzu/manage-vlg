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
    GET_CUSTOMER:(postList, roleId) =>  `/Users?RoleId=${roleId}&PageSize=${postList.pageSize}&Current=${postList.current}&SearchContent=${postList.SearchContent}`,
    GER_FOR_ID:(id)=> `/Users/${id}`,
  },
  RESTAURANT: {
    GET_ALL:(postList) => `Restaurants?PageSize=${postList.pageSize}&Current=${postList.current}&SearchContent=${postList.SearchContent}`,
    CREATE_RESTAURNT:`/Restaurants`,  
    GER_FOR_ID:(id)=> `/Restaurants/${id}`,
    UPDATE_RESTAURANT:(id) => `/Restaurants/${id}`,
    DELETE_RESTAURANT: (id) => `/Restaurants/${id}`, 
    _GET_PRODUCT: (postList) => `/Products/Restaurateur?PageSize=${postList.pageSize}&Current=${postList.current}&SearchContent=${postList.SearchContent}`,
    _CREATE_PRODUCT: `/Products`,
    ACTIVE_RES: (id) => `/Restaurants/${id}/Active`,
    GET_ORDER: '/Orders/Restaurant',
    GET_ORDER_ID:(id) => `/Orders?orderId=${id}`,
    GET_RESTAURANTPROFILE: '/Restaurants/RestaurantProfile',
    CANCEL_ORDER: (id) => `/Orders/${id}/CancelOrder`
  },
  SHIPPER : {
    GET_SHIPPER:(postList, roleId) =>  `/Users?RoleId=${roleId}&PageSize=${postList.pageSize}&Current=${postList.current}&SearchContent=${postList.SearchContent}`,
  },
  APPROVE: {
    GET_RESTAURANT:(postList) =>  `/RegisterRestaurants?PageSize=${postList.pageSize}&Current=${postList.current}&SearchContent=${postList.SearchContent}`,
    APPROVE_RESTAURANT: (id) => `/RegisterRestaurants/${id}/Approve`,
    GET_SHIPPER:(postList) => `/RegisterShippers?PageSize=${postList.pageSize}&Current=${postList.current}&SearchContent=${postList.SearchContent}`,
    APPROVE_SHIPPER: (id) => `/RegisterShippers/${id}/Approve`,
  },
  PRODUCT: {
    UPDATE_PRODUCT: (id) => `/Products/${id}`
  },
  DASHBOARD: {
    GET_DATA_ADMIN: '/Dashboards/Admin',
    GET_DATA_RESTAURANT: '/Dashboards/Restaurateur'
  }
};