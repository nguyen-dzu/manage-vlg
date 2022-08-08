import { Layout, notification, PageHeader, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import apiService from "../../../../api/apiService";
import { useAppDispatch, useAppSelector } from "../../../../hook/useRedux";
import { actions } from "../../../../redux";
import errorHandler from "../../../../request/errorHandel";

export default function Order() {
  const [toDoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const inforOrder = useAppSelector((state) => state.order.orderData)
  useEffect(() => {
    const timerData2 = setTimeout(() => {
      callData();
    }, 4000)
    const timer = setTimeout(() => {
      fetchUserOrder();
      if(toDoList.length > inforOrder.length){
        notification.success({
          message: 'Bạn Có Đơn Hàng Mới',
        })
        inforOrder([...toDoList])
      }
    }, 3000)
    return () => clearTimeout(timer, timerData2)
  }, [toDoList]);

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

  const callData = async () =>{ 
    const data = await apiService.getOrder();
    dispatch(actions.orderActions.setOrder(data.data))
  }

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
      title: "trạng thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
  ];
  return (
    <Layout>
      <PageHeader title="Quản Lý Đơn Hàng " ghost={false} />
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
