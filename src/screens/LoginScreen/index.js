import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Input, Row, Col } from "antd";
import { customerLogin } from "../../redux/features/customer";
import { ROUTES } from "../../constants/routerConst";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const handleFormSubmit = useCallback(async ({ username, password }) => {
    await dispatch(customerLogin({ username, password })).then((res) => {
      window.location.href = ROUTES.HOME_ROUTER;
    });
  });

  return (
    <Form
      name="basic"
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
        margin: "auto",
        textAlign: "center",
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
    >
      <Form.Item>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
          }}
        >
          Đăng Nhập
        </h1>
      </Form.Item>

      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Hãy nhập tên người dùng!",
          },
        ]}
      >
        <Input placeholder="Tên người dùng" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Hãy nhập tên người dùng!",
          },
        ]}
      >
        <Input placeholder="Mật khẩu" />
      </Form.Item>

      <Row>
        <Col>
          <Button type="primary">Primary Button</Button>
          <Button type="primary" htmlType="submit" onSubmit={handleFormSubmit}>
            Đăng nhập
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default LoginScreen;
