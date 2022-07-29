import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Form, Input, message, notification, Spin } from "antd";
import Button from "antd-button-color";
import { LoadingOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../../hook/useRedux";
import { actions } from "../../../redux";
import "./Login.scss";
import authService from "../../../api/authService";

function Login() {
    const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  // const token = true;
  const [loading, setLoading] = useState(false);
  
   useEffect(() => {
    const checkToken = async () => {
      if (token) {
        navigation('/admin')
      } else {
        navigation('/')
        openNotification();
      }
    };
    checkToken();
  }, []);

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16
    }
  };
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const openNotification = () => {
    const args = {
      message: "Đăng nhập Admin",
      description: "Xin mời đăng nhập",
      duration: 2
    };
    notification.success(args);
  };
  const onFinish = (values) => {
    const fecthAuth = async () => {
      setLoading(true);
      try {
        const response = await authService.login(values);
        dispatch(actions.authActions.Login(response.data));
        localStorage.setItem('Bearer', `Bearer ${response.data}`);
        // setToken(response.access_token);
        // dispatch(loginSuccess(token));
        setTimeout(() => {
          setLoading(false);
          navigation('/admin')
          message.success("Đăng nhập thành công");
        }, 1000);
      } catch (error) {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fecthAuth();
    // dispatch(actions.authActions.clickAdd('Akkk'));
    // history.replace('/admin')
  };

  return (
    <div>
      <div className="Home">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <h2>Login</h2>

            <Form
              {...layout}
              name="basic"
              initialValues={{
                remember: true
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="emailAddress"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your email!"
                  }
                ]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!"
                  }
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Spin indicator={antIcon} spinning={loading}>
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                </Spin>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
