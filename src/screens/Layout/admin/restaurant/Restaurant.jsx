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
      title: "Tên Quán",
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
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ảnh Bìa",
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
      title: "Trạng Thái",
      dataIndex: "isActive",
      key: "isActive",
      render: (status, item) => {
        return (
          <>
            <Popconfirm
              title={!status ? "Kích hoạt quán ăn này ?" : "Khóa quán ăn này ?"}
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
                {!status ? "Đã Khóa" : "Đang Hoạt Động"}
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
      console.log(data)
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
      <PageHeader title="Quản lý Quán Ăn" ghost={false} />
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
            dispatch(actions.formActions.setNameMenu("Duyệt Quán Ăn"));
          }}
          key={`${uniqueId()}`}
        >
          Duyệt Shipper
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
