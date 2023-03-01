import React from "react";
import { Button, Form, Input, Typography } from "antd";
import "./RegisterScreen.css";

const RegisterScreen = () => {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  return (
    <Form className="register-form" {...formItemLayout}>
      <Typography.Title
        level={1}
        style={{
          margin: 0,
          textAlign: "center",
          marginLeft: "150px"
        }}
      >
        Đăng ký
      </Typography.Title>
      <br></br>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "Email không đúng định dạng!",
          },
          {
            required: true,
            message: "Hãy nhập Email của bạn!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          {
            required: true,
            message: "Hãy nhập Password của bạn!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Nhập lại mật khẩu"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Hãy nhập Password của bạn!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Nhập lại mật khẩu không đúng!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="name"
        label="Họ và tên"
        rules={[
          {
            required: true,
            message: "Hãy nhập Họ và tên của bạn!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Số điện thoại"
        rules={[
          {
            required: true,
            message: "Hãy nhập Số điện thoại của bạn!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="ci"
        label="CMTND/CCCD"
        rules={[
          {
            required: true,
            message: "Hãy nhập CMTND/CCCD của bạn!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Địa chỉ"
        rules={[
          {
            required: true,
            message: "Hãy nhập Địa chỉ của bạn!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="register-form-button">
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterScreen;
