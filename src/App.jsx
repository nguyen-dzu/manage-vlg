import React, { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hook/useRedux";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import SiderDemo from "./screens/admin";
import MakeRoutes from "./router/pageRouter";
import "./assets/css/demo.css";
import "./index.css";
import "antd/dist/antd.css";
import "antd-button-color/dist/css/style.css";
import Login from "./screens/Layout/Login/Login";
import HomePage from "./screens/Layout/HomePage";

function App(props) {
  const [checkAccessToken, setCheckAccessToken] = useState();
  const token = useAppSelector((state) => state.auth.token);

  const AuthRouter = () => {
    return (
      <SiderDemo>
        <MakeRoutes />
      </SiderDemo>
    );
  };
  //const token = true;

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
      <Route
        path="/admin"
        element={token ? <AuthRouter /> : <Navigate to={"/"} />}
      ></Route>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
