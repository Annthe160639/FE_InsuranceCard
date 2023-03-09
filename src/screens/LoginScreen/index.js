import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
    <>
      <Row type="flex" justify="center" align="center">
        <Col span={8}>
          <Row>
            <Col span={24}>
              <h1
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Đăng Nhập
              </h1>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form
                name="login-form"
                wrapperCol={{
                  span: 16,
                }}
                autoComplete="off"
                layout="vertical"
                onFinish={handleFormSubmit}
              >
                <Form.Item
                  wrapperCol={16}
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
                  wrapperCol={16}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập tên người dùng!",
                    },
                  ]}
                  style={{ marginBottom: 0 }}
                >
                  <Input type="password" placeholder="Mật khẩu" />
                </Form.Item>
                <Form.Item
                  wrapperCol={16}
                  style={{ marginBottom: 0, textAlign: "right" }}
                >
                  <span>
                    Chưa có tài khoản?{" "}
                    <Link to={ROUTES.CUSTOMER_REGISTER_ROUTER}>Đăng ký</Link>
                  </span>
                </Form.Item>
                <Form.Item wrapperCol={16} style={{ textAlign: "center" }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onSubmit={handleFormSubmit}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default LoginScreen;
