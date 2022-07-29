import {
    HomeOutlined
  } from "@ant-design/icons";
import { AdminRouter } from "../../router/pageRouter";
  
  export const ROLES = [
    { value: 0b1, key: "home", name: "Trang Chủ" },

  ];
  export const MENU = [
    {
      id: 1,
      path: AdminRouter.HOME.path,
      icon: HomeOutlined,
      title: "Trang Chủ",
      items: [],
      value: 0b1
    },
  ];
  