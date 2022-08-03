import {
  Avatar,
  Button,
  Divider,
  Layout,
  message,
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
} from "@ant-design/icons";
import moment from "moment";
import apiService from "../../../../api/apiService";
import MyPagination from "../../../../components/Pagination";
import errorHandler from "../../../../request/errorHandel";
import uniqueId from "../../../../utils/uinqueId";
import ActionCustomer from "./Action";
import Search from "antd/lib/input/Search";
import Highlighter from "react-highlight-words";
export default function Customer() {
  const [toDoList, setTodoList] = useState([]);
  const [postList, setPostList] = useState({
    pageSize: 10,
    current: 1,
    SearchContent: ''
  });
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const roleId = "c812fa79-de2f-11ec-8bb8-448a5b2c2d80";
  const [loadingCustomer, setLoadingCustomer] = useState(false);
  const [addCustomer, setAddCustomer] = useState(false);
  const [value, setValue] = useState([])
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await apiService.getUser(postList, roleId);
        if (data) {
          setTodoList(
            data.data.pagedData.map((item, index) => {
              return {
                key: item.id,
                stt: index + 1,
                emailAddress: item.emailAddress,
                avatar: item.avatar,
                fullName: item.fullName,
                phoneNumber: item.phoneNumber,
                roleId: item.roleId,
                isActive: item.isActive,
                role: item.role,
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
        setPagination(data.data.pageInfo);
      } catch (error) {
        errorHandler(error);
      }
    };
    fetchCustomer();
  }, [loadingCustomer, addCustomer, postList]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "7%",
    },
    {
      title: "avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: "10%",
      render: (item) => {
        return (
          <>
            {item ? (
              <Avatar src={item} />
            ) : (
              <Avatar size={64} icon={<UserOutlined />} />
            )}
          </>
        );
      },
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
      render: (fullName) => (
        <Highlighter
          highlightClassName="YourHighlightClass"
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          autoEscape={true}
          searchWords={value}
          textToHighlight={fullName}
        />
      ),
    },

    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (status, item) => {
        return (
          <>
            <Popconfirm
              title={
                !status ? "Kích hoạt người dùng này ?" : "Khóa người dùng này ?"
              }
              onConfirm={() => confirmStatus(status, item.id, item.stt)}
              onCancel={cancel}
              okText="Đồng ý"
              cancelText="Hủy"
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
        compare: (a, b) => a.isActive - b.isActive,
        multiple: 2,
      },
    },
  ];

  function confirmStatus(status, id, index) {
    const obj = {
      userId: id,
      isActive: !status,
    };
    const updateStatus = async () => {
      const data = await apiService.activeUser(obj);
      if (data.data.isActive == status) {
        notification.error({
          message: status
            ? "Khóa không thành công"
            : "Kích hoạt không thành công",
        });
      } else {
        if (!status) {
          notification.success({
            message: "kích hoạt thành công",
          });
        } else {
          notification.success({
            message: "khóa thành công",
          });
        }
        const tamp = [...toDoList];
        tamp[index - 1] = { ...tamp[index - 1], isActive: !status };
        setTodoList(tamp);
      }
      setLoading(true);
      if (data) {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };
    updateStatus();
  }
  const onSearch = (value) => {
    setValue([value]);
    const filteredEvents = toDoList.filter(({ fullName }) => {
      fullName = fullName.toLowerCase();
      return fullName.includes(value);
    });
    setTodoList(filteredEvents);
    setPostList({
      SearchContent: value ? value :'',
      pageSize: 10,
      current: pagination.current,
    });
    setTimeout((
      setLoading(true)
    ), 3000)
  };
  function cancel(e) {
    message.error("Click on No");
  }
  return (
    <Layout>
      <PageHeader title="Quản lý Khách Hàng" ghost={false} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 15,
          marginBottom: 0,
        }}
      >
        <Search
          style={{ width: 350 }}
          placeholder="Tìm Kiếm ... "
          onSearch={onSearch}
        />
        <Button
          type="success"
          onClick={() => setAddCustomer(true)}
          key={`${uniqueId()}`}
        >
          Thêm Khách Hàng
        </Button>
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
      <ActionCustomer
        addCustomer={addCustomer}
        setAddCustomer={setAddCustomer}
        loadingCustomer={loadingCustomer}
        setLoadingCustomer={setLoadingCustomer}
      />
    </Layout>
  );
}
