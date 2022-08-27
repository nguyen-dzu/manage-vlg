import {
  Button,
  Form,
  Image,
  Input,
  message,
  Modal,
  Radio,
  Upload,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import apiService from "../../../../api/apiService";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

export default function EditInfoRes({
  item,
  setItem,
  updateInfoRess,
  setUpdateInfoRess,
  loadingUpdate,
  setLoadingUpdate,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const frmData = new FormData();
  const [active, setActive] = useState(true)
  const handelOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        setLoading(true);
        frmData.append("Name", values.Name ? values.Name : item.name);
        frmData.append(
          "Address",
          values.Address ? values.Address : item.address
        );
        frmData.append(
          "IsActive",
          active
        );
        frmData.append(
          "banner",
          values.Banner
            ? values.Banner.file
            : `http://localhost:8500/${item.banner}`
        );
        const data = await apiService.updateRestaurant(item.id, frmData);
        if (data) {
          setLoading(false);
          message.success("sửa thành công");
        }
        setUpdateInfoRess(false);
        setItem("");
        setLoadingUpdate(!loadingUpdate);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed", info);
      });
  };
  const handelCancel = () => {
    form.resetFields();
    setItem("");
    setUpdateInfoRess(false);
  };

  return (
    <Modal
      title={"Chỉnh Sửa Cửa Hàng"}
      visible={updateInfoRess}
      loading={loading}
      onCancel={handelCancel}
      footer={[
        <Button key="back" onClick={handelCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handelOk}
        >
          Lưu Chỉnh Sửa
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          midifier: "public",
          IsActive: true,
        }}
        autoComplete="off"
      >
        <Form.Item label="Tên Cửa Hàng" name="Name">
          <Input placeholder={item.id ? item.name : ""} />
        </Form.Item>
        <Form.Item label="Địa Chỉ Cửa Hàng" name="Address">
          <Input placeholder={item.id ? item.address : ""} />
        </Form.Item>
        <Form.Item
          label="Trạng Thái Cửa Hàng"
          name="IsActive"
          valuePropName="checked"
        >
          <Radio.Group defaultValue={true} buttonStyle="solid" onChange={(e) => setActive(e.target.value)}>
            <Radio.Button value={true} style={{
              marginRight: 10
            }}>Đang Hoạt Động</Radio.Button>
            <Radio.Button value={false}>Ngưng Hoạt Động</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Image src={`http://localhost:8500/${item.banner}`} />
        <Form.Item label="Ảnh Bìa" name="Banner">
          <Upload listType="text" beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
