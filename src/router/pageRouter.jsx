import { Route, Routes } from "react-router";
import SiderDemo from "../screens/admin";
import Roles from "../screens/Layout/admin/Roles";
import HomePage from "../screens/Layout/HomePage";

const routes = [
  {
    path: "/home",
    component: (props) => <HomePage {...props} />,
  },
  {
    path: "/role",
    component: (props) => <Roles {...props} />,
  },
];

const MakeRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            element={route.component}
          />
        );
      })}
    </Routes>
  );
};

export default MakeRoutes;
