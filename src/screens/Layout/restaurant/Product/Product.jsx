import {
  Button,
  Divider,
  Image,
  Layout,
  message,
  PageHeader,
  Space,
  Table,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import apiService from "../../../../api/apiService";
import MyPagination from "../../../../components/Pagination";
import errorHandler from "../../../../request/errorHandel";
import uniqueId from "../../../../utils/uinqueId";
import SearchName from "../../Search";
import AddProduct from "./Modal";
import {EditOutlined} from '@ant-design/icons'

export default function Product() {
  const [toDoList, setTodoList] = useState([]);
  const [postList, setPostList] = useState({
    pageSize: 10,
    current: 1,
    SearchContent: "",
  });
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const roleId = "c812fa79-de2f-11ec-8bb8-448a5b2c2d80";
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [editProduct, setEditProduct] = useState([]);
  const [value, setValue] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await apiService.getProductRes(postList);
        if (data) {
          setTodoList(
            data.data.pagedData.map((item, index) => {
              return {
                key: item.id,
                stt: index + 1,
                name: item.name,
                image: item.image,
                description: item.description,
                price: item.price,
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
    fetchProduct();
  }, [loadingProduct, addProduct, postList]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "7%",
    },
    {
      title: "Tên Sản Phẩm",
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
      title: "Ảnh Sản Phẩm",
      dataIndex: "image",
      key: "image",
      width: '20%',
      render: (item) => <Image style={{height: 250, width: 250}} src={`http://localhost:8500/${item}`} />,
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Giả Sản Phẩm",
      dataIndex: "price",
      key: "price",
      render: (item) => {
        return (
          <span>
            {item.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        );
      },
    },

    {
      title: "Hành Động",
      key: "actions",
      render: (item) => {
        return (
          <Space>
            <EditOutlined onClick={() => handelEdit(item)} />
          </Space>
        );
      },
    },
  ];

  const handelEdit = (item) => {
    setEditProduct(item);
    setAddProduct(true);
  };
  const onSearch = (value) => {
    setValue([value]);
    const filteredEvents = toDoList.filter(({ fullName }) => {
      fullName = fullName.toLowerCase();
      return fullName.includes(value);
    });
    setTodoList(filteredEvents);
    setPostList({
      SearchContent: value ? value : "",
      pageSize: 10,
      current: pagination.current,
    });
    setTimeout(setLoading(true), 3000);
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
        <SearchName onSearch={onSearch} />
        <Button
          type="success"
          onClick={() => setAddProduct(true)}
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
      <AddProduct
        item={editProduct}
        setItem={setEditProduct}
        addProduct={addProduct}
        setAddProduct={setAddProduct}
        loadingProduct={loadingProduct}
        setLoadingProduct={setLoadingProduct}
      />
    </Layout>
  );
}
