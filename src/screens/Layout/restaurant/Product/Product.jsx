import { Button, Col, Image, Layout, PageHeader, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import apiService from "../../../../api/apiService";
import errorHandler from "../../../../request/errorHandel";
import uniqueId from "../../../../utils/uinqueId";
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
  useEffect(() => {
    const fetchData = async () => {
      const data = await apiService.getProductRes(postList);
      try {
        if (data) {
          const { pagedData } = data.data;
          setListProduct(pagedData);
        }
      } catch (error) {
        errorHandler(error);
      }
      setTimeout(() => {
        setLoading(false);
      });
    };
    fetchData();
  }, [postList]);

  return (
    <Layout key={`${uniqueId()}`}>
      <PageHeader title="Sản Phẩm Của Bạn" ghost={false} extra={[
          <Button onClick={() => setAddProduct(true)} type='success'>thêm sản phẩm</Button>

      ]} />
      <Spin spinning={loading}>
        <Row
          justify="space-around"
          gutter={[16, 16]}
        >
          {listProduct
            ? listProduct.map((item, index) => {
                return (
                  <>
                    <Col
                      span={4}
                      style={{
                        margin: 15,
                        padding: 0,
                        backgroundColor: "#fff",
                        borderRadius: 20,
                        boxShadow:
                          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      }}
                      key={item.id}
                    >
                      <ItemProduct item={item} key={index++} />
                    </Col>
                  </>
                );
              })
            : ""}
        </Row>
      </Spin>
      <AddProduct addProduct={addProduct} setAddProduct={setAddProduct} />
    </Layout>
  );
}
