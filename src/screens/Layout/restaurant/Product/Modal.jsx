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

export default function AddProduct({
  item,
  setItem,
  addProduct,
  setAddProduct,
  loading,
  setLoading,
}) {
  console.log(item);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const { Option } = Select;
  const frmData = new FormData();

  const handelOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        frmData.append("Name", values.Name);
        frmData.append("Price", values.Price);
        frmData.append("Description", values.Description);
        frmData.append("Image", values.Image.file);
        frmData.append("ProductTypeId", values.ProductTypeId);

        setConfirmLoading(true);
        setLoading(!loading);
        if (item.id) {
          const data = await apiService.updateProduct(item.id, frmData);
          if (data) {
            message.success("sửa thành công");
          }
        } else {
          const data = await apiService.createProduct(frmData);
          if (data) {
            message.success("thêm thành công");
          }
        }

        setAddProduct(false);
        form.resetFields();
      })
      .catch((info) => {
        message.error(`Thực hiện không thành công ${info}`);
      });
  };

  const handelCancel = () => {
    form.resetFields();
    setItem("");
    setAddProduct(false);
  };

  return (
    <>
      <Modal
        title={item.id ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm"}
        visible={addProduct}
        onOk={handelOk}
        onCancel={handelCancel}
        confirmLoading={confirmLoading}
        okText={item.id ? "Lưu Thay Đổi" : "Thêm Mới"}
        cancelText={"Hủy"}
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
            <Input placeholder={item.id ? item.name : ""} />
          </Form.Item>
          <Form.Item
            label="Giá Sản Phẩm"
            name={"Price"}
            rules={[
              { require: true, message: "vui lòng nhập vào giá sản phẩm" },
            ]}
          >
            <Input type={"number"} placeholder={item.id ? item.price : ""} />
          </Form.Item>
          <Form.Item
            label="Mô Tả"
            name={"Description"}
            rules={[{ require: true, message: "vui lòng nhập vào mô tả" }]}
          >
            <Input placeholder={item.id ? item.description : ""} />
          </Form.Item>
          {item.id ? 
            <Image src={`http://localhost:8500/${item.image}`} />
          : ''}
          <Form.Item label="Hình Ảnh Sản Phẩm" name={"Image"}>
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
