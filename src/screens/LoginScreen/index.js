import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Input, Row, Col } from "antd";
import { customerLogin } from "../../redux/features/customer";

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleFormSubmit = ({ username, password }) => {
    dispatch(customerLogin({ username, password })).then((res) => {
      if (res) {
        console.log(res);
      }
    });
  };

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
