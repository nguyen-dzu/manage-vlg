import { Checkbox, Form, Input, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import apiService from "../../../../api/apiService";

export default function ActionAdmin({
  addAdmin,
  setAddAdmin,
  loadingAdmin,
  setLoadingAdmin,
}) {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handelOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setConfirmLoading(true);
        const valuesAdmin = {
          emailAddress: values.emailAddress,
          password: values.password,
          fullName: values.fullName,
          phoneNumber: values.phoneNumber,
          roleId: "c812fa78-de2f-11ec-8bb8-448a5b2c2d83",
        };
        const data = await apiService.createAdmin(valuesAdmin);
        if (data) {
          message.success("thêm thành công");
        }

        setLoadingAdmin(!loadingAdmin);
        setAddAdmin(false);
        form.resetFields();
      })
      .catch((info) => {
        message.error(
          "Tạo tài khoản không thành công, có thể email đã tồn tại"
        );
      });
  };
  const handelCancel = () => {
    form.resetFields();
    setAddAdmin(false);
  };

  return (
    <>
      <Modal
        title={"thêm Admin"}
        visible={addAdmin}
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
            <Input type={"number"} />
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
            label="password"
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
