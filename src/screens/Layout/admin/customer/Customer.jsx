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
import SearchName from "../../Search";
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
      title: "???nh ?????i Di???n",
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
      title: "H??? V?? T??n",
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
      title: "S??? ??i???n Tho???i",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Tr???ng Th??i",
      dataIndex: "isActive",
      key: "isActive",
      render: (status, item) => {
        return (
          <>
            <Popconfirm
              title={
                !status ? "K??ch ho???t ng?????i d??ng n??y ?" : "Kh??a ng?????i d??ng n??y ?"
              }
              onConfirm={() => confirmStatus(status, item.id, item.stt)}
              onCancel={() => cancel}
              okText="?????ng ??"
              cancelText="H???y"
              placement="left"
            >
              <Button
                type={!status ? "danger" : "primary"}
                icon={!status ? <LockOutlined /> : <UnlockOutlined />}
              >
                {!status ? "???? Kh??a" : "??ang Ho???t ?????ng"}
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
            ? "Kh??a kh??ng th??nh c??ng"
            : "K??ch ho???t kh??ng th??nh c??ng",
        });
      } else {
        if (!status) {
          notification.success({
            message: "k??ch ho???t th??nh c??ng",
          });
        } else {
          notification.success({
            message: "kh??a th??nh c??ng",
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
      <PageHeader title="Qu???n l?? Kh??ch H??ng" ghost={false} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: 15,
          marginBottom: 0,
        }}
      >
        <SearchName onSearch={onSearch} />
        <Button
          type="success"
          onClick={() => setAddCustomer(true)}
          key={`${uniqueId()}`}
        >
          Th??m Kh??ch H??ng
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
