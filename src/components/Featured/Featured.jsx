import React from "react";
import "./Featured.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { DownOutlined, MoreOutlined, UpOutlined } from "@ant-design/icons";

export default function Featured({totalRevenue}) {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Tổng Doanh Thu</h1>
        <MoreOutlined />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Tổng tất cả doanh thu đạt được</p>
        <p className="amount">{totalRevenue}</p>
        <p className="desc">
          Tất cả các giao dịch với khác hàng và quán ăn trước đó, và các khoản thanh toán cuối cùng.
        </p>
      </div>
    </div>
  );
}
