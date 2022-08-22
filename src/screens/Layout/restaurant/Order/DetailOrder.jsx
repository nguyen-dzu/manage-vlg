import { Layout, Modal } from "antd";
import React from "react";
import { useState } from "react";
import apiService from "../../../../api/apiService";

export default function DetailOrder({
  item,
  setItem,
  detailOrder,
  setDetailOrider,
}) {
  const [inforOrder, setInforOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchInfoOrder = async () => {
      const data = await apiService.getOrder(item.id);
    };
    setTimeout(() => {
      setLoading(!loading);
    }, 3000);
    setLoading(true);
    fetchInfoOrder();
  }, [loading]);

  function handelOk() {
    setDetailOrider(false);
    setItem("");
  }
  return (
    <Modal
      className="Model_"
      title={"Thông Tin Chi Tiết Đơn Hàng"}
      visible={detailOrder}
      onOk={handelOk}
      onCancel={handelOk}
    ></Modal>
  );
}
