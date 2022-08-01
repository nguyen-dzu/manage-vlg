import React, {} from "react";
import "./App.css";
import { BrowserRouter, Routes } from "react-router-dom";
import MakeRoutes from "./router/pageRouter";
import "./assets/css/demo.css";
import "./index.css";
import "antd/dist/antd.css";
import "antd-button-color/dist/css/style.css";

function App() {
  return (
    <BrowserRouter>
      <MakeRoutes />
    </BrowserRouter>
  );
}

export default App;
