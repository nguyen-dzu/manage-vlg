import { Layout, Table } from "antd";
import React from "react";
import Widget from "../../components/Widget/Widget";
import Chart from "../../components/Chart/Chart";

import './Home.scss'
import Featured from "../../components/Featured/Featured";

export default function HomePage() {
  const DataSource = [
    {
      id: '1',
      MSSV: '197PM31229',
      name: 'Nguyễn Hoàng Vũ',
      age: '21',
      address: 'TP HCM',
    },
    {
      id: '2',
      MSSV: '197PM31229',
      name: 'Nguyễn Hoàng Vũ',
      age: '21',
      address: 'TP HCM',
    },
    {
      id: '3',
      MSSV: '197PM31229',
      name: 'Nguyễn Hoàng Vũ',
      age: '21',
      address: 'TP HCM',
    },
    {
      id: '4',
      MSSV: '197PM31229',
      name: 'Nguyễn Hoàng Vũ',
      age: '21',
      address: 'TP HCM',
    },
    {
      id: '5',
      MSSV: '197PM31229',
      name: 'Nguyễn Hoàng Vũ',
      age: '21',
      address: 'TP HCM',
    },
  ]
  const Column = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: '6%',
    },
    {
      title: "Mã Số Sinh Viên",
      dataIndex: "MSSV",
      key: "MSSV",
    },
    {
      title: "Họ Và Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    }
  ]
  return (
    <Layout>
      <div className="homeContainer">
        <div className="homeWidget">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <h1 className="liiditle">Thành Viên Trong Nhóm</h1>
          <Table dataSource={DataSource} columns={Column}/>
        </div>
      </div>
     
    </Layout>
  );
}
