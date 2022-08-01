import {
  Avatar,
  Button,
  Divider,
  Image,
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
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import apiService from "../../../../api/apiService";
import MyPagination from "../../../../components/Pagination";
import errorHandler from "../../../../request/errorHandel";

export default function Restaurant() {
  const [toDoList, setTodoList] = useState([]);
  const [postList, setPostList] = useState({
    pageSize: 10,
    current: 1,
  });
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await apiService.getRestaurant(postList);
        if (data) {
          setTodoList(
            data.data.pagedData.map((item, index) => {
              return {
                key: item.id,
                stt: index + 1,
                name: item.name,
                address: item.address,
                isActive: item.isActive,
                banner: item.banner,
                addressType: item.addressType,
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
    fetchRestaurant();
  }, [postList]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "7%",
    },

    {
      title: "Tên Quán",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "banner",
      dataIndex: "banner",
      key: "banner",
      render: (item) => {
        return (
          <>{item ? <Image src={`http://localhost:8500/${item}`} /> : ""}</>
        );
      },
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
      title: "trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (status, item) => {
        return (
          <>
            <Popconfirm
              title={!status ? "Kích hoạt quán ăn này ?" : "Khóa quán ăn này ?"}
              // onConfirm={() => confirmStatus(status, item.id, item.stt)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
              placement="left"
            >
              <Button
                type={!status ? "danger" : "primary"}
                icon={!status ? <LockOutlined /> : <UnlockOutlined />}
              >
                {!status ? "đã khóa" : "đang hoạt động"}
              </Button>
            </Popconfirm>
          </>
        );
      },
      sorter: {
        compare: (a, b) => a.isActive - b.status,
      },
    },
  ];
  return (
    <Layout>
      <PageHeader title="Quản lý Quán Ăn" ghost={false} />
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
