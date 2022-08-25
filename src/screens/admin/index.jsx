import { Button, Layout, Menu, message, Switch } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import logo from "../../../src/assets/img/logo.png";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserSwitchOutlined,
  UserOutlined,
  SolutionOutlined,
  AuditOutlined,
  BankOutlined,
  ShopOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  FileProtectOutlined,
  BorderOuterOutlined
} from "@ant-design/icons";
import React from "react";
import HeaderProFile from "../../assets/scss/headerProfile";
import "./index.scss";

import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { actions } from "../../redux";
import authService from "../../api/authService";
const { SubMenu } = Menu;
// export default function SiderDemo({ items }) {
//   return(<div>a</div>)
// }
export default function SiderDemo({ items, headerItem = null }) {
  const navigate = useNavigate();

  const nameMenu = useAppSelector((state) =>
    state.form.nameMenu ? state.form.nameMenu : "Trang Chủ"
  );
  const dispatch = useAppDispatch();
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("dark");
  const {role} = useAppSelector(state => state.auth.info)
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    const fetchInfor = async () => {
      try {
        const reponse = await authService.getInfo();
        const { data } = reponse;
        dispatch(actions.authActions.setInfo(data));
      } catch (error) {
        if (error.response.status === 401) {
          dispatch(actions.authActions.logout());
        }
      }
    };
    fetchInfor();
  }, []);
  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };
  return (
    <Layout>
      <Sider
        theme={theme}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width="250"
      >
        <div className="logo">
          <img src={logo} alt="" className="img-responsive" />
        </div>
        <Menu
          theme={theme}
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ border: "none" }}
        >
          <Menu.Item
            key="1"
            icon={<HomeOutlined />}
            onClick={() => {
              navigate("/home");
              dispatch(actions.formActions.setNameMenu("Trang Chủ"));
            }}
          >
            Trang Chủ
          </Menu.Item>
          {role.id == "c812fa78-de2f-11ec-8bb8-448a5b2c2d83" ? (
            <>
              <SubMenu
                key={"NGUOIDUNG"}
                icon={<SolutionOutlined />}
                title="Quản Lý Người Dùng"
              >
                <Menu.Item
                  key="CUSTOMER"
                  icon={<UserOutlined />}
                  onClick={() => {
                    navigate("/customer");
                    dispatch(actions.formActions.setNameMenu("Khách Hàng"));
                  }}
                >
                  Khách Hàng
                </Menu.Item>
                <Menu.Item
                  key="SHIPPER"
                  icon={<UserOutlined />}
                  onClick={() => {
                    navigate("/shipper");
                    dispatch(actions.formActions.setNameMenu("Shipper"));
                  }}
                >
                  Shipper
                </Menu.Item>
                <Menu.Item
                  key="ADMIN"
                  icon={<UserOutlined />}
                  onClick={() => {
                    navigate("/admin");
                    dispatch(actions.formActions.setNameMenu("Admin"));
                  }}
                >
                  Admin
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key={"Appove"}
                icon={<AuditOutlined />}
                title="Duyệt Người Dùng"
              >
                <Menu.Item
                  key="approveShipper"
                  icon={<UserAddOutlined />}
                  onClick={() => {
                    navigate("/approveShipper");
                    dispatch(actions.formActions.setNameMenu("Duyệt Shipper"));
                  }}
                >
                  Shipper
                </Menu.Item>
                <Menu.Item
                  key="approveRestaurant"
                  icon={<UsergroupAddOutlined />}
                  onClick={() => {
                    navigate("/approveRestaurant");
                    dispatch(actions.formActions.setNameMenu("Duyệt Quán Ăn"));
                  }}
                >
                  Quán Ăn
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key={"QUANAN"}
                icon={<ShopOutlined />}
                title="Quản Lý Quán Ăn"
              >
                <Menu.Item
                  key="QUANAN.1"
                  icon={<FileProtectOutlined />}
                  onClick={() => {
                    navigate("/restaurant");
                    dispatch(actions.formActions.setNameMenu("Quán Ăn"));
                  }}
                >
                  Quán Ăn
                </Menu.Item>
              </SubMenu>
            </>
          ) : role.id == "c812fa79-de2f-11ec-8bb8-448a5b3c2d80" ? (
            <>
              {" "}
              <Menu.Item
                key="SANPHAM"
                icon={<FileProtectOutlined />}
                onClick={() => {
                  navigate("/restaurantProduct");
                  dispatch(actions.formActions.setNameMenu("Menu Quán"));
                }}
              >
                Menu Quán
              </Menu.Item>
              <Menu.Item
                key="infoRes"
                icon={<ShopOutlined />}
                onClick={() => {
                  navigate("/infoRestaurant");
                  dispatch(actions.formActions.setNameMenu("Thông Tin Quán"));
                }}
              >
                Thông Tin Quán Ăn
              </Menu.Item>
              <Menu.Item
                key="orderRes"
                icon={<BorderOuterOutlined />}
                onClick={() => {
                  navigate("/order");
                  dispatch(actions.formActions.setNameMenu("Đơn Hàng Mới"));
                }}
              >
                Đơn Hàng Mới
              </Menu.Item>
            </>
          ) : role.id == "c812fa79-de2f-11ec-8bb8-448a5b2c2d80" ||
            role.id == "c812fa78-de2f-11ec-8bb8-448a5b2c2d80" ? (
            ((dispatch(actions.authActions.logout()), localStorage.clear()),
            message.error("Bạn Không Có Quyền Đăng Nhập"))
          ) : (
            ""
          )}
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
          {nameMenu && (
            <h3 style={{ fontSize: 25, color: "#fff" }}>{nameMenu}</h3>
          )}
          <HeaderProFile />
        </Header>
        <Content className="site-layout-background">{items}</Content>
      </Layout>
    </Layout>
  );
}
