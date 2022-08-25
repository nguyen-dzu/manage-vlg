import React from "react";
import {
  UpOutlined,
  UserOutlined,
  WalletOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  SolutionOutlined,TagsOutlined
} from "@ant-design/icons";
import "./widget.scss";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../hook/useRedux";
import { actions } from "../../redux";

const Widget = ({ title ,type, amount, routerScreen }) => {
  let data;
  //temporary
  const diff = 20;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  switch (type) {
    case "user":
      data = {
        title: title,
        name: "customer",
        link: "Xem Tất Cả Khách Hàng",
        icon: (
          <UserOutlined
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "restaurant":
      data = {
        title: title,
        name: "restaurant",
        link: "Xem Tất Cả Quán Ăn",
        icon: (
          <ShopOutlined
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "shipper":
      data = {
        title: title,
        name: "Shipper",
        link: "Xem Tất Cả Shipper",
        icon: (
          <SolutionOutlined
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: title,
        name: 'order',
        link: "Xem Tất Cả Đơn Hàng Mới",
        icon: (
          <ShoppingCartOutlined
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;

    default:
      break;
  }
  function handelRoute(params) {
    navigate(params);
    dispatch(actions.formActions.setNameMenu(title));
  }
  return (
    <div className="widget">
      <div style={{
        width: '70%'
      }} className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
         <TagsOutlined style={{fontSize: 20, marginRight: 10}} />{amount}
        </span>
        <Button className="link" ghost type="dashed" style={{
          borderColor: '#C02424'
        }} onClick={() => handelRoute(routerScreen)}>
          <span style={{color: '#C02424'}}>{data.link}</span>
        </Button>
      </div>
      <div className="right">
        {data.name == "order" ? (
          <div className="percentage positive">
            <UpOutlined />
            {diff} %
          </div>
        ) : (
          ""
        )}
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
