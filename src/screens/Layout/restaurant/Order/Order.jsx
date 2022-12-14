import {
  Button,
  Layout,
  message,
  Modal,
  notification,
  PageHeader,
  Popconfirm,
  Table,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import apiService from "../../../../api/apiService";
import { useAppDispatch, useAppSelector } from "../../../../hook/useRedux";
import { actions } from "../../../../redux";
import errorHandler from "../../../../request/errorHandel";
import {
  ExclamationCircleOutlined,
  SearchOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  IssuesCloseOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import DetailOrder from "./DetailOrder";
export default function Order() {
  const [toDoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [showOrder, setShowOrder] = useState(false);
  const [listOrder, setListOrder] = useState([]);
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
                  id: item.id,
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
          title: "????n H??ng M???i",
          icon: <ExclamationCircleOutlined />,
          content: "B???n c?? ????n h??ng m???i",
          cancelText: "H???y",
          okText: "Nh???n",
          okType: "success",
          closable: true,
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
      title: "?????a Ch???",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "S??? ??i???n Tho???i",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Ghi Ch??",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Tr???ng Th??i",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (item) => {
        return (
          <>
            {item == 0 ? (
              <Button ghost type="warning" icon={<ClockCircleOutlined />}>
                ??ang chu???n b???
              </Button>
            ) : item == 1 ? (
              <Button ghost type="info" icon={<IssuesCloseOutlined />}>
                ??ang giao
              </Button>
            ) : item == 2 ? (
              <Button ghost type="success" icon={<CheckCircleOutlined />}>
                ???? Ho??n Th??nh
              </Button>
            ) : (
              <Button ghost type="danger" icon={<CloseCircleOutlined />}>
                H???y
              </Button>
            )}
          </>
        );
      },
    },
    {
      title: "H??nh ?????ng",
      key: "actions",
      render: (item) => {
        return (
          <>
            <div>
              <Button
                icon={<SearchOutlined />}
                type="info"
                onClick={() => handelShow(item)}
              >
                Xem Th??m
              </Button>
              {item.orderStatus == 2 ? (
                ""
              ) : (
                <Popconfirm
                  title="B???n X??c Nh???n H???y ????n h??ng"
                  onConfirm={() => handelCancel(item)}
                  okText="?????ng ??"
                  cancelText="H???y"
                  placement="left"
                >
                  <Button
                    style={{
                      marginTop: 10,
                    }}
                    icon={<CloseCircleOutlined />}
                    type="danger"
                  >
                    H???y
                  </Button>
                </Popconfirm>
              )}
            </div>
          </>
        );
      },
    },
  ];

  function handelCancel(item) {
    const cancelOrder = async () => {
      const data = await apiService.cancelOrder(item.id);
      if (data) {
        setLoading(!loading);
        notification.success({
          message: "h???y ????n th??nh c??ng",
        });
      }
      const tamp = [...toDoList];
      setTodoList(tamp);
    };
    cancelOrder();
  }

  const handelShow = (item) => {
    setShowOrder(true);
    setListOrder(item)
  }
  return (
    <Layout>
      <PageHeader title="Qu???n L?? ????n H??ng " ghost={false} />
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
        <span style={{ fontWeight: "600" }}>Ph?? Shipper: 10.000 VN??</span>
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
      {showOrder ? (
        <DetailOrder
          item={listOrder}
          setItem={setListOrder}
          detailOrder={showOrder}
          setDetailOrder={setShowOrder}
        />
      ) : (
        ""
      )}
    </Layout>
  );
}
