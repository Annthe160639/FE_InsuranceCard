import React, { useCallback } from "react";
import "./LoginScreen.css";
import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/user";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function LoginScreen({ location, history }) {
  const dispatch = useDispatch();
  const handleLogin = useCallback(
    () => dispatch(login({ username: "anntc", password: "anntc" })),
    []
  );
  handleLogin();

  return (
    <Form name="normal_login" className="login-form">
      <Typography.Title
        level={1}
        style={{
          margin: 0,
          textAlign: "center", 
        }}
      >
        Đăng nhập
      </Typography.Title>
      <br></br>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Hãy nhập Email của bạn!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        ></Input>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Hãy nhập Password của bạn!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        ></Input>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Đăng nhập
        </Button>
      </Form.Item>
      <Form.Item>
      <Link to="/forgotpassword">Quên mật khẩu?</Link>
        <Form.Item className="login-register-form">
          Chưa có tài khoản?
          <Link to="/register"> Đăng ký ngay</Link>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}
