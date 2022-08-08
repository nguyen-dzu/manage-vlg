import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { useAppSelector } from "../hook/useRedux";
import SiderDemo from "../screens/admin";
import Roles from "../screens/Layout/admin/Roles";
import HomePage from "../screens/Layout/HomePage";
import Login from "../screens/Layout/Login/Login";
import { Navigate } from "react-router-dom";
import Customer from "../screens/Layout/admin/customer/Customer";
import Restaurant from "../screens/Layout/admin/restaurant/Restaurant";
import Shipper from "../screens/Layout/admin/Shipper/Shipper";
import Admin from "../screens/Layout/admin/admin/Admin";
import ApproveRestaurant from "../screens/Layout/admin/Approve/Restaurant";
import ApproveShiper from "../screens/Layout/admin/Approve/Shipper";
import Product from "../screens/Layout/restaurant/Product/Product";
import InforRes from "../screens/Layout/restaurant/InforRes/InforRes";
import Order from "../screens/Layout/restaurant/Order/Order";

export const routes = [
  {
    path: "/home",
    headerItem: null,
    element: <HomePage />,
  },
  {
    path: "/customer",
    headerItem: null,
    element: <Customer />,
  },
  {
    path: "/restaurant",
    headerItem: null,
    element: <Restaurant />,
  },
  {
    path: "/shipper",
    headerItem: null,
    element: <Shipper />,
  },
  {
    path: "/admin",
    headerItem: null,
    element: <Admin />,
  },
  {
    path: "/approveRestaurant",
    headerItem: null,
    element: <ApproveRestaurant/>,
  },
  {
    path: "/approveShipper",
    headerItem: null,
    element: <ApproveShiper />,
  },
  {
    path: "/restaurantProduct",
    headerItem: null,
    element: <Product />,
  },
  {
    path: "/infoRestaurant",
    headerItem: null,
    element: <InforRes />,
  },
  {
    path: '/order',
    headerItem: null,
    element: <Order />
  }
];
const MakeRoutes = () => {
  const [checkAccessToken, setCheckAccessToken] = useState();

  const token = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    const auth = localStorage.getItem("persist:root");
    if (auth) {
      let stringParse = JSON.parse(auth);
      const accessToken = JSON.parse(stringParse.auth).data;
      setCheckAccessToken(accessToken);
    }
  }, [token, checkAccessToken]);
  return (
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            element={
              token ? (
                <SiderDemo items={route.element} headerItem={route.headerItem} />              ) : (
                <Navigate to="/" />
              )
            }
          />
        );
      })}
      <Route path="/" element={<Login />} />
      {/* <Route path='/admin' element={<HomePage />} /> */}
    </Routes>
  );
};

export default MakeRoutes;
