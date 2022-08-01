import { Divider, Layout, PageHeader, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import api from "../../../api/api";
import apiService from "../../../api/apiService";
import MyPagination from "../../../components/Pagination";
import errorHandler from "../../../request/errorHandel";

export default function Roles() {
  const [toDoList, setToDoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      const data = await apiService.getRoles();
      try {
        if (data) {
          setToDoList(
            data.data.map((item, index) => {
              return {
                id: item.id,
                key: item.id,
                stt: index + 1,
                name: item.name,
                users: item.users ,
                createdAt: moment(item.createdAt).format(
                  "DDDD-MMMM-YYYY HH:mm"
                ),
              };
            })
          );
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        errorHandler(error);
      }
    };
    return () => {
      fetchRoles();
    };
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "7%",
    },
    {
      title: "Tên Phân Quyền",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Người Dùng",
      dataIndex: "users",
      key: "users",
      render: (item) => <p>{item ? item : 'người dùng chưa tồn tại'}</p>
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <Layout
      className="layout-container"
      style={{
        backgroundColor: "#fff",
      }}
    >
        <PageHeader
        title="Quản lý Phân Quyền"
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
    </Layout>
  );
}
