import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Input, Row, Col, Select } from "antd";
import { customerLogin } from "../../redux/features/customer";
import { ROUTES } from "../../constants/routerConst";
import { createNotification } from "../../redux/features/notification";
import { managerLogin } from "../../redux/features/manager";
import { setUser } from "../../redux/features/user";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFormSubmit = useCallback(async ({ username, password, role }) => {
    let res = { payload: null, error: null };

    switch (role) {
      case "customer":
        res = await dispatch(customerLogin({ username, password }));
        break;
      case "staff":
        res = await dispatch(customerLogin({ username, password }));
        break;
      case "manager":
        res = await dispatch(managerLogin({ username, password }));
        break;
      default:
    }

    if (res.error) {
      await dispatch(
        createNotification({
          type: "error",
          message: "Có lỗi xảy ra khi đăng nhập",
        })
      );
      return;
    }
    if (res.payload) {
      
      await dispatch(setUser(res.payload));
      await dispatch(
        createNotification({
          type: "success",
          message: `Chào, ${username}`,
        })
      )

      setTimeout(()=> {
        window.location.href = ROUTES.HOME_ROUTER
      }, 300)
    }
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
                fields={[
                  {
                    name: "role",
                    value: "customer",
                  },
                ]}
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
                  <Input
                    addonBefore={
                      <Form.Item name="role" noStyle>
                        <Select
                          style={{ width: 120 }}
                          options={[
                            {
                              value: "customer",
                              label: "Người dùng",
                            },
                            {
                              value: "staff",
                              label: "Nhân viên",
                            },
                            {
                              value: "manager",
                              label: "Quản lý",
                            },
                          ]}
                        />
                      </Form.Item>
                    }
                    placeholder="Tên người dùng"
                  />
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
