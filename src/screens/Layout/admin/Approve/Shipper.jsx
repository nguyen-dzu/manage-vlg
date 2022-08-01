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
  ExclamationCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";
import apiService from "../../../../api/apiService";
import MyPagination from "../../../../components/Pagination";
import errorHandler from "../../../../request/errorHandel";
import { render } from "less";

export default function ApproveShiper() {
  const [toDoList, setTodoList] = useState([]);
  const [postList, setPostList] = useState({
    pageSize: 10,
    current: 1,
  });
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  useEffect(() => {
    const fetchApproveShiper = async () => {
      try {
        const data = await apiService.getApproveShipper(postList);
        if (data) {
          setTodoList(
            data.data.pagedData.map((item, index) => {
              return {
                key: item.id,
                stt: index + 1,
                emailAddress: item.emailAddress,
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
    fetchApproveShiper();
  }, [postList, loading]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "7%",
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
      key: "emailAddress",
    },
    {
      title: "Họ Và Tên",
      dataIndex: "fullName",
      key: "fullName",
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
      content: "Bạn có chắc chắn duyệt shipper này không?",
      okText: "yes",
      okType: "danger",
      onOk() {
        const ApproveShipper = async () => {
          const data = await apiService.ApproveShiper(items.id);
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
      <PageHeader title="Duyệt Shipper" ghost={false} />
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
