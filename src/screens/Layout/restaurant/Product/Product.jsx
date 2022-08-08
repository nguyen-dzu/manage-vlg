import { Button, Col, Divider, Image, Layout, PageHeader, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import apiService from "../../../../api/apiService";
import MyPagination from "../../../../components/Pagination";
import { useAppDispatch } from "../../../../hook/useRedux";
import { actions } from "../../../../redux";
import errorHandler from "../../../../request/errorHandel";
import uniqueId from "../../../../utils/uinqueId";
import SearchName from "../../Search";
import "./index.scss";
import ItemProduct from "./ItemProduct";
import AddProduct from "./Modal";
export default function Product() {
  const [listProduct, setListProduct] = useState([]);
  const [postList, setPostList] = useState({
    pageSize: 10,
    current: 1,
    SearchContent: "",
  });
  const [loading, setLoading] = useState(true);
  const [addProduct, setAddProduct] = useState(false);
  const dispatch = useAppDispatch();
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await apiService.getProductRes(postList);
      try {
        if (data) {
          const { pagedData } = data.data;
          setListProduct(pagedData);
          dispatch(actions.restaurantActions.setInfo(pagedData))
        }
        setPagination(data.data.pageInfo);
      } catch (error) {
        errorHandler(error);
      }
      setTimeout(() => {
        setLoading(false);
      });
    };
    fetchData();
  }, [postList, addProduct]);
  const handelEdit = (item) => {
    console.log(item);
  };
  return (
    <Layout key={`${uniqueId()}`}>
      <PageHeader
        title="Sản Phẩm Của Bạn"
        ghost={false}
        style={{
          marginBottom: 10
        }}
        extra={[
          <Button onClick={() => setAddProduct(true)} type="success">
            thêm sản phẩm
          </Button>,
        ]}
      />
      <Spin spinning={loading}>
        <Row justify="space-around" gutter={[18, 18]}>
          {listProduct
            ? listProduct.map((item, index) => {
                return (
                  <>
                    <Col
                      span={4}
                      style={{
                        margin: 15,
                        backgroundColor: "#fff",
                        borderRadius: 20,
                        paddingLeft: 0,
                        paddingRight: 0,
                        boxShadow:
                          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      }}
                      key={item.id}
                    >
                      <ItemProduct item={item} key={index++} />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          marginTop: 10,
                          marginBottom: 5,
                        }}
                      >
                        <Button
                          style={{
                            width: 80,
                            borderRadius: 20,
                          }}
                          type="success"
                          onClick={() => handelEdit(item)}
                        >
                          Sửa
                        </Button>
                        <Button
                          style={{
                            width: 80,
                            borderRadius: 20,
                          }}
                          danger
                        >
                          Xóa
                        </Button>
                      </div>
                    </Col>
                  </>
                );
              })
            : ""}
        </Row>
      </Spin>
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
      <AddProduct addProduct={addProduct} setAddProduct={setAddProduct} />
    </Layout>
  );
}
