import {
  Checkbox,
  Form,
  Input,
  message,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import apiService from "../../../../api/apiService";

export default function ActionCustomer({
  addCustomer,
  setAddCustomer,
  loadingCustomer,
  setLoadingCustomer,
}) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handelOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true);
        const valuesCustomer = {
          emailAddress: values.emailAddress,
          password: values.password,
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          roleId: "c812fa79-de2f-11ec-8bb8-448a5b2c2d80",
        };
        const data = await apiService.createCustomer(valuesCustomer);
            if (data) {
                message.success("thêm thành công");
              }
        
        
        setLoadingCustomer(!loadingCustomer);
        setAddCustomer(false);
        form.resetFields();
      })
      .catch((info) => {
        message.error('Tạo tài khoản không thành công, có thể email đã tồn tại')
      });
  };
  const handelCancel = () => {
    form.resetFields();
    setAddCustomer(false);
  };

  return (
    <>
      <Modal
        title={"Thêm Khách Hàng"}
        visible={addCustomer}
        onOk={handelOk}
        onCancel={handelCancel}
        confirmLoading={confirmLoading}
        okText={"Thêm mới"}
        cancelText={'Hủy'}
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
            label="Họ Và Tên"
            name={"fullName"}
            rules={[{ require: true, message: "vui lòng nhập vào họ và tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name={"phoneNumber"}
            rules={[
              { require: true, message: "vui lòng nhập vào số điện thoại" },
            ]}
          >
            <Input type={'number'} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="emailAddress"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input type="email" autoComplete="off" />
          </Form.Item>
          <Form.Item
            label="Mật Khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "vui lòng nhập vào password",
              },
            ]}
          >
            <Input.Password autoComplete="off" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
