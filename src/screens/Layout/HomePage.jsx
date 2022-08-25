import { Layout, Spin, Table } from "antd";
import React, { useEffect, useState } from "react";
import Widget from "../../components/Widget/Widget";
import Chart from "../../components/Chart/Chart";

import "./Home.scss";
import Featured from "../../components/Featured/Featured";
import apiService from "../../api/apiService";
import { useAppSelector } from "../../hook/useRedux";

export default function HomePage() {
  const [valueChart, setValueChart] = useState([]);
  const [valueWidget, setValueWidget] = useState([]);
  const [valueRevenue, setValueRevenue] = useState({});
  const [loading, setLoading] = useState(true);
  const {role} = useAppSelector(state => state.auth.info)

  useEffect(() => {
    const fetchValueChart = async () => {
      const data = await apiService.getDashboardAdmin();
      setValueChart(data.data.revenue);
      setValueWidget(data.data);
      setValueRevenue(data.data);
    };
    setLoading(true)
    if(role.id == 'c812fa78-de2f-11ec-8bb8-448a5b2c2d83'){
      fetchValueChart();
      setLoading(false);
    }else{
      setLoading(false);
    }
  }, []);
  const DataSource = [
    {
      id: "1",
      MSSV: "197PM31229",
      name: "Nguyễn Hoàng Vũ",
      age: "21",
      address: "TP HCM",
    },
    {
      id: "2",
      MSSV: "197PM31229",
      name: "Nguyễn Hoàng Vũ",
      age: "21",
      address: "TP HCM",
    },
    {
      id: "3",
      MSSV: "197PM31229",
      name: "Nguyễn Hoàng Vũ",
      age: "21",
      address: "TP HCM",
    },
    {
      id: "4",
      MSSV: "197PM31229",
      name: "Nguyễn Hoàng Vũ",
      age: "21",
      address: "TP HCM",
    },
    {
      id: "5",
      MSSV: "197PM31229",
      name: "Nguyễn Hoàng Vũ",
      age: "21",
      address: "TP HCM",
    },
  ];
  const Column = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: "6%",
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
    },
  ];
  return (
    <Layout>
      <Spin spinning={loading}>
        <div className="homeContainer">
          <div className="homeWidget">
            <Widget routerScreen={'/customer'} title={'Khách Hàng'} type="user" amount={valueWidget.user} />
            <Widget routerScreen={'/restaurant'} title={'Quán Ăn'} type="restaurant" amount={valueWidget.restaurant} />
            <Widget routerScreen={'/shipper'} title={'Shipper'} type="shipper" amount={valueWidget.shipper} />
          </div>
          <div className="charts">
            <Featured
              totalRevenue={
                valueRevenue.totalRevenue
                  ? valueRevenue.totalRevenue.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })
                  : valueRevenue.totalRevenue
              }
            />
            <Chart aspect={2 / 1} data={valueChart} />
          </div>
          <div>
            <h1>Đơn Hàng Mới</h1>
            <Table dataSource={DataSource} columns={Column} />
          </div>
        </div>
      </Spin>
    </Layout>
  );
}
