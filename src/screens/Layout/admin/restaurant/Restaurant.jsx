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
import Highlighter from "react-highlight-words";
import Search from "antd/lib/input/Search";
import { useNavigate } from "react-router";
import uniqueId from "../../../../utils/uinqueId";
import { actions } from "../../../../redux";
import { useAppDispatch } from "../../../../hook/useRedux";
import SearchName from "../../Search";

export default function Restaurant() {
  const [toDoList, setTodoList] = useState([]);
  const [postList, setPostList] = useState({
    pageSize: 10,
    current: 1,
    SearchContent: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [value, setValue] = useState([]);
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
        setPagination(data.data.pageInfo);
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
      title: "T??n Qu??n",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <Highlighter
          highlightClassName="YourHighlightClass"
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          autoEscape={true}
          searchWords={value}
          textToHighlight={name}
        />
      ),
    },
    {
      title: "?????a Ch???",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "???nh B??a",
      dataIndex: "banner",
      key: "banner",
      render: (item) => {
        return (
          <>{item ? <Image src={`http://localhost:8500/${item}`} /> : ""}</>
        );
      },
    },

    {
      title: "Khu V???c",
      dataIndex: "addressType",
      key: "addressType",
      render: (item) => {
        return (
          <span>
            {item == 0
              ? "Trong Khu??n Vi??n Tr?????ng"
              : item == 1
              ? "C???ng ?????ng Th??y Tr??m"
              : item == 2
              ? "C???ng D????ng Qu???ng H??m"
              : ""}
          </span>
        );
      },
      sorter: (a, b) => a.addressType - b.addressType,
    },
    {
      title: "Tr???ng Th??i",
      dataIndex: "isActive",
      key: "isActive",
      render: (status, item) => {
        return (
          <>
            <Popconfirm
              title={!status ? "K??ch ho???t qu??n ??n n??y ?" : "Kh??a qu??n ??n n??y ?"}
              onConfirm={() => confirmStatus(status, item.id, item.stt)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
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
        compare: (a, b) => a.isActive - b.status,
      },
    },
  ];

  function confirmStatus(status, id, index) {
    const updateStatus = async () => {
      const data = await apiService.activeRestaurant(id, {isActive: !status});
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
  function cancel(e) {
    message.error("Click on No");
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
  return (
    <Layout>
      <PageHeader title="Qu???n l?? Qu??n ??n" ghost={false} />
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
          onClick={() => {
            navigate("/approveRestaurant");
            dispatch(actions.formActions.setNameMenu("Duy???t Qu??n ??n"));
          }}
          key={`${uniqueId()}`}
        >
          Duy???t Qu??n ??n
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
    </Layout>
  );
}
