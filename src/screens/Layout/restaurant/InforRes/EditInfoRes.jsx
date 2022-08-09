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
  const [listInfo, setListInfo] = useState([]);
  const frmData = new FormData();

  const handelOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        frmData.append("Name", values.Name ? values.Name : true);
        frmData.append("Address", values.Address);
        frmData.append("IsActive", values.IsActive);
        frmData.append("Banner", values.Banner.file);
        setLoading(true);
        const data = await apiService.updateRestaurant(item.id, frmData);
        if (data) {
          setLoading(!loading);
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
          isActive: true,
        }}
        autoComplete="off"
      >
        <Form.Item label="Tên Cửa Hàng" name="Name">
          <Input placeholder={item.id ? item.name : ''}/>
        </Form.Item>
        <Form.Item label="Địa Chỉ Cửa Hàng" name="Address">
          <Input placeholder={item.id ? item.address : ''} />
        </Form.Item>
        <Form.Item label="Trạng Thái Cửa Hàng" name="IsActive">
          <Radio.Group defaultValue={true}>
            <Radio value={true}>Đang Hoạt Động</Radio>
            <Radio value={false}>Không Hoạt Động</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên Cửa Hàng" name="Banner">
          <Image src={`http://localhost:8500/${item.banner}`} />
          <Upload listType="text" beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}
