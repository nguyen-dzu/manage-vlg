import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import logo from "../../../src/assets/img/logo.png";
import {
  LeftOutlined ,
  RightOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined
} from "@ant-design/icons";
import React from "react";
import HeaderProFile from "../../assets/scss/headerProfile";
import "./index.scss";
//import admin from "../../../../api/Collections/admin";

import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { actions } from "../../redux";
import authService from "../../api/authService";
const { SubMenu } = Menu;
// export default function SiderDemo({ items }) {
//   return(<div>a</div>)
// }
export default function SiderDemo({ items }) {
  const navigate = useNavigate();

  const nameMenu = useAppSelector((state) =>
    state.form.nameMenu ? state.form.nameMenu : "Trang Chủ"
  );
  const dispatch = useAppDispatch();
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    const fecthUserProfile = async () => {
      try {
        const { data } = await authService.getInfo();
        dispatch(actions.authActions.setInfo(data));
        // setRole(data.role);
      } catch (error) {
        if (error.response.status === 401) {
          // dispatch(actions.authActions.logout());
        }
      }
    };
    setTimeout(() => {
      fecthUserProfile();
    }, 1000);
  }, []);
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo">
          <img src={logo} alt="" className="img-responsive" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ border: "none" }}
        >
         <Menu.Item
            key="1"
            icon={<HomeOutlined />}
            onClick={() => {
              navigate("home");
              dispatch(actions.formActions.setNameMenu("Trang Chủ"));
            }}
          >
            Trang Chủ
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background header"
          style={{ padding: 0 }}
        >
          <div className="left">
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </div>
          {nameMenu && <h3 style={{ fontSize: 25, color: '#FFF' }}>{nameMenu}</h3>}
          <HeaderProFile />
        </Header>        
      </Layout>
    </Layout>
  );
}

