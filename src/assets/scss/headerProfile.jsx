import { Avatar, Badge, Dropdown, Menu } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hook/useRedux";
import { actions } from "../../redux";
import { LoginOutlined, BellFilled, UserOutlined } from "@ant-design/icons";
import authService from "../../api/authService";

export default function HeaderProFile() {
  const navigation = useNavigate();
  // const getProFile = useAppSelector((state) => state.showProfile.data);
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  
  const info = useAppSelector((state) => state.auth.info);
  const getProFile = {
    name: info ? info.fullName : "Admin",
    avatar: <Avatar icon={<UserOutlined />} /> 
  };
  
  useEffect(() => {
    if (getProFile) {
      setShow(true);
    }
  });
  

  const logout = () => {
    dispatch(actions.authActions.logout());
    localStorage.clear();
  };
  // const routerProfile = () => {
  //   history.replace("/admin/profile");
  // };
  const menu = show ? (
    <Menu>
      <Menu.ItemGroup title={`Hi ${getProFile.name}`}>
        <Menu.Divider />
      </Menu.ItemGroup>
      <Menu.Item icon={<LoginOutlined />} onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  ) : (
    ""
  );
  return (
    <div className="right">
      <div className="mr15">
        <Badge dot={true} offset={[-2, 0]}>
          <a style={{ color: "#FFF" }}>
            <BellFilled />
          </a>
        </Badge>
      </div>
      <div>
        <Dropdown overlay={menu} overlayStyle={{ width: "20rem" }}>
          <div className="ant-dropdown-link">
            <Avatar
              src={
                show ? (
                  getProFile.avatar
                ) : ""
              }
              alt="avatar"
              style={{ cursor: "pointer" }}
            />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
