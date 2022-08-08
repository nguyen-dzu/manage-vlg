import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
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
  const {Option} = Select;
  const frmData = new FormData();
  const handelOk = () => {
    form.validateFields().then(async (values) => {
      console.log(values);
      frmData.append("Name", values.Name);
      frmData.append("Price", values.Price);
      frmData.append("Description", values.Description);
      frmData.append("Image", values.Image.file);
      frmData.append("ProductTypeId", values.ProductTypeId);

      // // const Products = {
      //   //   Name: values.Name,
      //   //   Price: values.Price,
      //   //   Description: values.Description,
      //   //   Image: frmData,
      //   //   ProductTypeId: values.ProductTypeId,
      //   // };
      console.log(frmData);
      setConfirmLoading(true);
      const data = await apiService.createProduct(frmData);
      if (data) {
        message.success("thêm thành công");
      }
      setAddProduct(false);
      form.resetFields();
    });
    //   .catch((info) => {
    //     message.error("Tạo sản phẩm không thành công");
    //   });
  };

  const handelCancel = () => {
    form.resetFields();
    setAddProduct(false);
  };
  // const HandelUpload = (options) => {
  //   if (options.target && options.target.files[0]) {
  //     frmData.append('file', options.target.files[0])
  //   }
  // }
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
            <InputNumber addonAfter= 'VNĐ' controls={false} />
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
            // rules={[{ require: true, message: "vui chọn ảnh sản phẩm" }]}
          >
            <Upload listType="text" beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Loại Sản Phẩm"
            name={"ProductTypeId"}
            rules={[
              { require: true, message: "vui lòng nhập vào loại sản phẩm" },
            ]}
          >
            <Select>
              <Option value="c777fa78-de2f-11ec-8bb8-448a5b2c2d80">
                Đồ Nước
              </Option>
              <Option value="c666fa79-de2f-11ec-8bb8-448a5b2c2d80">
                Đồ Uống
              </Option>
              <Option value="c779fa79-de2f-11ec-8bb8-448a5b2c2d80">
                Đồ Ăn Nhanh
              </Option>
              <Option value="c778fa78-de2f-11ec-8bb8-448a5b2c2d83">
                Ăn Vặt
              </Option>
              <Option value="c667fa79-de2f-11ec-8bb8-448a5b3c2d80">Cơm</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
