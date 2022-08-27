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
  const { role } = useAppSelector((state) => state.auth.info);

  const [valueChartRes, setValueChartRes] = useState([]);
  const [valueWidgetRes, setValueWidgetRes] = useState([]);
  const [valueRevenueRes, setValueRevenueRes] = useState({});
  useEffect(() => {
    const fetchDarhBoardAdmid = async () => {
      const reponse = await apiService.getDashboardAdmin();
      setValueChart(reponse.data.revenue);
      setValueWidget(reponse.data);
      setValueRevenue(reponse.data);
      setLoading(true);
      console.log(reponse)
      if(reponse){
        setLoading(false)
      }
    };
    const fetchDarhBoardRes = async () => {
      const data = await apiService.getDashboardRestaurant();
      setValueChartRes(data.data.revenue);
      setValueWidgetRes(data.data);
      setValueRevenueRes(data.data);
      setLoading(true);
      if (data) {
        setLoading(false);
      }
    };
    setLoading(true);
    if (role.id == "c812fa78-de2f-11ec-8bb8-448a5b2c2d83") {
      fetchDarhBoardAdmid();
      setLoading(false);
    } else {
      fetchDarhBoardRes();
      setLoading(false);
    }
  }, []);

  return (
    <Layout>
      <Spin spinning={loading}>
        {role.id == "c812fa78-de2f-11ec-8bb8-448a5b2c2d83" ? (
          <div className="homeContainer">
            <div className="homeWidget">
              <Widget
                routerScreen={"/customer"}
                title={"Khách Hàng"}
                type="user"
                amount={valueWidget.user}
              />
              <Widget
                routerScreen={"/restaurant"}
                title={"Quán Ăn"}
                type="restaurant"
                amount={valueWidget.restaurant}
              />
              <Widget
                routerScreen={"/shipper"}
                title={"Shipper"}
                type="shipper"
                amount={valueWidget.shipper}
              />
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
          </div>
        ) : (
          <div className="homeContainer">
            <div className="homeWidget">
              <Widget
                routerScreen={"/restaurantProduct"}
                title={"Sản Phẩm"}
                type="user"
                amount={valueWidgetRes.product}
              />
              <Widget
                routerScreen={"/"}
                title={"Tổng Thu 6 tháng"}
                type="totalRevenue"
                amount={valueWidgetRes.totalRevenue?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              />
              <Widget
                routerScreen={"/order"}
                title={"Đơn Hàng"}
                type="order"
                amount={valueWidgetRes.order}
              />
            </div>
            <div className="charts">
              <Featured
                totalRevenue={
                  valueWidgetRes.totalRevenue
                    ? valueWidgetRes.totalRevenue.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })
                    : valueWidgetRes.totalRevenue
                }
              />
              <Chart aspect={2 / 1} data={valueChartRes} />
            </div>
          </div>
        )}
      </Spin>
    </Layout>
  );
}
