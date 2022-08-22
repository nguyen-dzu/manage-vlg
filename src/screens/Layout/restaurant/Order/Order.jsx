import {
  Button,
  Layout,
  message,
  Modal,
  notification,
  PageHeader,
  Table,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import apiService from "../../../../api/apiService";
import { useAppDispatch, useAppSelector } from "../../../../hook/useRedux";
import { actions } from "../../../../redux";
import errorHandler from "../../../../request/errorHandel";
import { ExclamationCircleOutlined, SearchOutlined, CheckCircleOutlined, ClockCircleOutlined, IssuesCloseOutlined,CloseCircleOutlined } from "@ant-design/icons";
export default function Order() {
  const [toDoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [showOrder, setShowOrder] = useState(false)
  const inforOrder = useAppSelector((state) => state.order.orderData);
  useEffect(() => {
    const timerData2 = setTimeout(() => {
      const callData = async () => {
        const data = await apiService.getOrder();
        dispatch(actions.orderActions.setOrder(data.data));
      };
      callData();
    }, 3500);
    const timer = setTimeout(() => {
      const fetchUserOrder = async () => {
        try {
          const data = await apiService.getOrder();
          if (data) {
            setTodoList(
              data.data.map((item, index) => {
                return {
                  key: item.id,
                  stt: index + 1,
                  address: item.address,
                  phoneNumber: item.phoneNumber,
                  note: item.note,
                  shippingFee: item.shippingFee,
                  total: item.total,
                  orderStatus: item.orderStatus,
                };
              })
            );
          }
          setTimeout(() => {
            setLoading(false);
          });
        } catch (error) {
          errorHandler(error);
        }
      };
      fetchUserOrder();
    }, 3000);
    setTimeout(() => {
      if (toDoList.length > inforOrder.length) {
        Modal.confirm({
          title: "Đơn Hàng Mới",
          icon: <ExclamationCircleOutlined />,
          content: "Bạn có đơn hàng mới",
          okText: "Nhận",
          cancelText: "Hủy",
          okType: "success",
        });
      }
    }, 1000);
    return () => clearTimeout(timer, timerData2);
  }, [toDoList]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "7%",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Ghi Chú",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Tổng Đơn Hàng",
      dataIndex: "total",
      key: "total",
      render: (item) => {
        return item.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        });
      },
    },
    {
      title: "Thu Nhập",
      key: "thushiper",
      render: (item) => {
        const result = item.total - item.shippingFee;
        return (
          <span>
            {result.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        );
      },
    },
    {
      title: "Trạng Thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (item) => {
        return (
          <>
            {item == 0 ? (
              <Button ghost type="warning" icon={<ClockCircleOutlined />}>Đang chuẩn bị</Button>
            ) : item == 1 ? (
              <Button ghost type="info" icon={<IssuesCloseOutlined />}>Đang giao</Button>
            ) : item == 2 ? (
              <Button ghost type="success" icon={<CheckCircleOutlined />}>Đã Hoàn Thành</Button>
            ) : (
              <Button ghost type="danger" icon={<CloseCircleOutlined />}>Hủy</Button>
            )}
          </>
        );
      },
    },
    {
      title: "Hành Động",
      key: "actions",
      render: (item) => {
        return (
          <>
            <Button icon={<SearchOutlined />} type="info">
              Xem Thêm
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <Layout>
      <PageHeader title="Quản Lý Đơn Hàng " ghost={false} />
      <div
        style={{
          width: 200,
          height: 40,
          backgroundColor: "#FFF",
          margin: 15,
          padding: 9,
          color: "#bd2130",
        }}
      >
        <span style={{ fontWeight: "600" }}>Phí Shipper: 10.000 VNĐ</span>
      </div>
      <Table
        style={{
          margin: "10px",
        }}
        className="table_rows"
        scroll={{ y: 2000 }}
        pagination={false}
        columns={columns}
        dataSource={toDoList}
        loading={loading}
      />
    </Layout>
  );
}
