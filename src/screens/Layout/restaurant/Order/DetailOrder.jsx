import React, { useEffect } from "react";
import { useState } from "react";
import apiService from "../../../../api/apiService";
import {
  Button,
  Col,
  Form,
  Grid,
  Image,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Upload,
} from "antd";
export default function DetailOrder({
  item,
  setItem,
  detailOrder,
  setDetailOrder,
}) {
  const [inforOrder, setInforOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchInfoOrder = async () => {
      const data = await apiService.getOrderById(item.id);
      setInforOrder(data.data);
    };
    setTimeout(() => {
      setLoading(!loading);
    }, 3000);
    setLoading(true);
    fetchInfoOrder();
  }, [loading]);

  function handelOk() {
    setDetailOrder(false);
    setItem("");
  }
  return (
    <Modal
      className="Model_"
      title={"Thông Tin Chi Tiết Đơn Hàng"}
      visible={detailOrder}
      onOk={handelOk}
      onCancel={handelOk}
    >
      {inforOrder ? (
        <>
          <Row>
            <Col span={8}>
                <h1>Thông Tin Đơn Hàng</h1>

            </Col>
            <Col span={8}>

            </Col>
            <Col span={8}>

            </Col>
          </Row>
        </>
      ) : (
        ""
      )}
    </Modal>
  );
}
