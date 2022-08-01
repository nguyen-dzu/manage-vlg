import {
  Avatar,
  Button,
  Divider,
  Layout,
  message,
  Modal,
  notification,
  PageHeader,
  Popconfirm,
  Space,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  UserOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import moment from "moment";
import apiService from "../../../../api/apiService";
import MyPagination from "../../../../components/Pagination";
import errorHandler from "../../../../request/errorHandel";

export default function ApproveRestaurant() {
  const [toDoList, setTodoList] = useState([]);
  const [postList, setPostList] = useState({
    pageSize: 10,
    current: 1,
  });
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  useEffect(() => {
    const fetchUserApproveRestaurant = async () => {
      try {
        const data = await apiService.getApproveRestaurant(postList);
        if (data) {
          setTodoList(
            data.data.pagedData.map((item, index) => {
              return {
                key: item.id,
                stt: index + 1,
                restaurantName: item.restaurantName,
                emailAddress: item.emailAddress,
                address: item.address,
                addressType: item.addressType,
                fullName: item.fullName,
                phoneNumber: item.phoneNumber,
                status: item.status,
                id: item.id,
                createdAt: moment(item.createdAt).format(
                  "DDDD-MMMM-YYYY HH:mm"
                ),
              };
            })
          );
        }
        setTimeout(() => {
          setLoading(false);
        });
        setPagination({
          totalDocs: data.data.pageInfo.totalPages,
        });
      } catch (error) {
        errorHandler(error);
      }
    };
    fetchUserApproveRestaurant();
  }, [postList]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
    },
    {
      title: "Tên Quán",
      dataIndex: "restaurantName",
      key: "restaurantName",
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
      key: "emailAddress",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Khu Vực",
      dataIndex: "addressType",
      key: "addressType",
      render: (item) => {
        return (
          <span>
            {item == 0
              ? "Trong Khuôn Viên Trường"
              : item == 1
              ? "Cổng Đặng Thùy Trâm"
              : item == 2
              ? "Cổng Dương Quảng Hàm"
              : ""}
          </span>
        );
      },
      sorter: (a, b) => a.addressType - b.addressType,
    },
    {
      title: "Tên Chủ Quán",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (item) => {
        return <span>{item ? "Đã Duyệt" : "Chưa Duyệt"}</span>;
      },
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: "Duyệt Shipper",
      key: "Action",
      render: (item) => {
        return (
          <Space size="middle">
            {item.status ? (
              <Button type="default" disabled={true}>Đã Duyệt</Button>
            ) : (
              <Button type="success" onClick={() => handelApprove(item)}>
                Duyệt
              </Button>
            )}
          </Space>
        );
      },
    },
  ];
  function handelApprove(items) {
    Modal.confirm({
      title: "xác nhận",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn duyệt quán ăn này không?",
      okText: "đồng ý",
      cancelText: 'hủy',
      okType: "danger",
      onOk() {
        const ApproveShipper = async () => {
          const data = await apiService.ApproveRestaurant(items.id);
          if (data) {
            message.success("duyệt thành công thành công");
            setLoading(!loading);
          }
        };
        ApproveShipper();
      },
      onCancel() {
        console.log("cancel");
      },
    });
  }

  return (
    <Layout>
      <PageHeader
        title="Duyệt Quán Ăn"
        ghost={false}
      />
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
      {
        <Divider orientation="right" plain>
          <MyPagination
            props={pagination}
            postList={postList}
            setPagination={setPostList}
            setLoading={setLoading}
          />
        </Divider>
      }
    </Layout>
  );
}