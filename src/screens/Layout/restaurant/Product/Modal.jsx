import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  message,
  Modal,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import apiService from "../../../../api/apiService";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

export default function AddProduct({ addProduct, setAddProduct }) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const frmData = new FormData();
  const handelOk = () => {
    form
      .validateFields()
      .then(async (values) => {

        const Products = {
          Name: values.Name,
          Price: values.Price,
          Description: values.Description,
          Image: frmData,
          ProductTypeId: values.ProductTypeId,
        };
        setConfirmLoading(true);
        const data = await apiService.createProduct(Products);
        if (data) {
          message.success("thêm thành công");
        }
        setAddProduct(false);
        form.resetFields();
      })
      .catch((info) => {
        message.error("Tạo sản phẩm không thành công");
      });
  };

  const handelCancel = () => {
    form.resetFields();
    setAddProduct(false);
  };
  const HandelUpload = (options) => {
    if(options.target && options.target.files[0]) {
        frmData.append('file', options.target.files[0])
    }
  }
  return (
    <>
      <Modal
        title={"thêm khách hàng"}
        visible={addProduct}
        onOk={handelOk}
        onCancel={handelCancel}
        confirmLoading={confirmLoading}
        okText={"thêm mới"}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            midifier: "public",
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Tên Sản Phẩm"
            name={"Name"}
            rules={[
              { require: true, message: "vui lòng nhập vào tên sản phẩm" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giá Sản Phẩm"
            name={"Price"}
            rules={[
              { require: true, message: "vui lòng nhập vào giá sản phẩm" },
            ]}
          >
            <Input type={"number"} />
          </Form.Item>
          <Form.Item
            label="Mô Tả"
            name={"Description"}
            rules={[{ require: true, message: "vui lòng nhập vào mô tả" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Hình Ảnh Sản Phẩm"
            name={"Image"}
            rules={[{ require: true, message: "vui chọn ảnh sản phẩm" }]}
          >
            <Input type={'file'} name='Image' onChange={(options) => HandelUpload(options)} />
          </Form.Item>
          <Form.Item
            label="Loại Sản Phẩm"
            name={"ProductTypeId"}
            rules={[
              { require: true, message: "vui lòng nhập vào loại sản phẩm" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
