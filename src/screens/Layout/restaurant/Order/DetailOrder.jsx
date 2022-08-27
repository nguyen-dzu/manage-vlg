import React, { useEffect } from "react";
import { useState } from "react";
import apiService from "../../../../api/apiService";
import {
  ExclamationCircleOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  IssuesCloseOutlined,
  CloseCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import bannerRestaurant from "../../../../assets/img/restaurantnoAvatar.png";

import {
  Avatar,
  Button,
  Col,
  Form,
  Grid,
  Image,
  Input,
  message,
  Modal,
  notification,
  Radio,
  Row,
  Spin,
  Upload,
} from "antd";
import "./index.scss";
import TextArea from "antd/lib/input/TextArea";
export default function DetailOrder({
  item,
  setItem,
  detailOrder,
  setDetailOrder,
}) {
  const [loading, setLoading] = useState(false);
  const [infoRestaurant, setInfoRestaurant] = useState([]);
  const [creator, setCreator] = useState([]);
  console.log(item)
  useEffect(() => {
    const fetchInfoOrder = async () => {
      const data = await apiService.getOrderById(item.id);
      const { restaurant } = data?.data.orderDetails[0]?.product;
      setInfoRestaurant(restaurant);
      setCreator(data.data.creator);
    };
    fetchInfoOrder();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  function handelok() {
    setDetailOrder(false);
    setItem("");
  }
  return (
    <Modal
      className="modal_"
      title={"Thông Tin Chi Tiết Đơn Hàng"}
      visible={detailOrder}
      onOk={handelok}
      onCancel={handelok}
      okText="Nhận"
      cancelText="Hủy"
    >
        <>
          <Row
            gutter={[48, 48]}
            style={{
              justifyContent: "center",
            }}
          >
            <Col span={8} style={{}}>
              <h3>Thông Tin Đơn Hàng</h3>
              <>
                <div className="containerTitle">
                  <span className="title_info">Địa Chỉ Giao Hàng: </span>
                  <div className="contentInfo">
                    <Button ghost type="info" className="Content">
                      {item.address}
                    </Button>
                  </div>
                </div>
                <div className="containerTitle">
                  <span className="title_info">Số Điện Thoại: </span>
                  <div className="contentInfo">
                    <Button ghost type="info" className="Content">
                      {item.phoneNumber}
                    </Button>
                  </div>
                </div>
                <div className="containerTitle">
                  <span className="title_info">Ghi Chú: </span>
                  <div className="contentInfo">
                    <Button ghost type="info" className="Content">
                      {item.note}
                    </Button>
                  </div>
                </div>
                <div className="containerTitle">
                  <span className="title_info">Tổng Phí: </span>
                  <div className="contentInfo">
                    <Button ghost type="info" className="Content">
                      {item.total?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Button>
                  </div>
                </div>{" "}
                <div className="containerTitle">
                  <span className="title_info">Phí Shipper: </span>
                  <div className="contentInfo">
                    <Button ghost type="info" className="Content">
                      {item.shippingFee?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Button>
                  </div>
                </div>
                <div className="containerTitle">
                  <span className="title_info">Trạng Thái: </span>
                  <div>
                    <div className="Content">
                      {item.orderStatus == 0 ? (
                        <Button
                          ghost
                          type="warning"
                          icon={<ClockCircleOutlined />}
                        >
                          Đang chuẩn bị
                        </Button>
                      ) : item.orderStatus == 2 ? (
                        <Button
                          ghost
                          type="info"
                          icon={<IssuesCloseOutlined />}
                        >
                          Đang giao
                        </Button>
                      ) : item.orderStatus == 3 ? (
                        <Button
                          ghost
                          type="success"
                          icon={<CheckCircleOutlined />}
                        >
                          Đã Hoàn Thành
                        </Button>
                      ) : (
                        <Button
                          ghost
                          type="danger"
                          icon={<CloseCircleOutlined />}
                        >
                          Hủy
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            </Col>
            <Col span={8}>
              <h3>Thông Tin Quán Ăn</h3>

              <Spin spinning={loading}>
                {infoRestaurant.banner ? (
                  <Image
                    src={`http://localhost:8500/${infoRestaurant.banner}`}
                  />
                ) : (
                  <Image src={bannerRestaurant} />
                )}

                <div className="containerTitle">
                  <span className="title_info">Tên Cửa Hàng: </span>
                  <div className="contentInfo">
                    <Button ghost type="info" className="Content">
                      {infoRestaurant.name}
                    </Button>
                  </div>
                </div>
                <div className="containerTitle">
                  <span className="title_info">Địa Chỉ Cửa Hàng: </span>
                  <div className="contentInfo">
                    <TextArea
                      rows={4}
                      disabled
                      placeholder={infoRestaurant.address}
                    ></TextArea>
                  </div>
                </div>
                <div className="containerTitle">
                  <span className="title_info">Số Điện Thoại: </span>
                  <div className="contentInfo">
                    <Button ghost type="info" className="Content">
                      {infoRestaurant.user?.phoneNumber
                        ? infoRestaurant.user?.phoneNumber
                        : "không có số điện thoại"}
                    </Button>
                  </div>
                </div>
              </Spin>
            </Col>
            <Col span={8}>
              <h3>Thông Tin Khách Hàng</h3>

              <Spin spinning={loading}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  {creator.avatar ? (
                    <Avatar src={`http://localhost:8500/${creator.avatar}`} />
                  ) : (
                    <Avatar size={"large"} icon={<UserOutlined />} />
                  )}
                  <div className="containerTitle">
                    <span className="title_info">Họ Và Tên: </span>
                    <div className="contentInfo">
                      <Button ghost type="info" className="Content">
                        {creator.fullName}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="containerTitle">
                  <span className="title_info">Email: </span>
                  <div className="contentInfo">
                    <Button ghost type="info" className="Content">
                      {creator.emailAddress}
                    </Button>
                  </div>
                </div>
                <div className="containerTitle">
                  <span className="title_info">Số Điện Thoại: </span>
                  <div className="contentInfo">
                    <Button ghost type="info" className="Content">
                      {creator.phoneNumber}
                    </Button>
                  </div>
                </div>
              </Spin>
            </Col>
          </Row>
        </>
    </Modal>
  );
}
