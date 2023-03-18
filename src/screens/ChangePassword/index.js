import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Form, Input, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { customerChangePassword } from "../../redux/features/customer";
import { ROUTES } from "../../constants/routerConst";
import { PageHeader } from "@ant-design/pro-components";
import { createNotification } from "../../redux/features/notification";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmitResetPassword = useCallback(async (values) => {
    const { error, payload } = await dispatch(customerChangePassword(values));
    console.log(payload);
    await dispatch(
      createNotification({
        type: error ? "error" : "success",
        message: error ? payload : "Cập nhật mật khẩu mới thành công",
      })
    );
    if (!error) {
      navigate(ROUTES.HOME);
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title="Thông tin cá nhân"
        style={{
          maxWidth: 600,
          background: "white",
        }}
      >
        <Content
          style={{
            backgroundColor: "white",
            width: 500,
            padding: "10px 20px",
            textAlign: "center",
          }}
        >
          <Title level={4} style={{ fontWeight: 700 }}>
            Thay đổi mật khẩu mới
          </Title>

          <Form
            layout="vertical"
            onFinish={handleSubmitResetPassword}
            form={form}
          >
            <Form.Item
              name="oldPassword"
              label="Mật khẩu cũ"
              rules={[
                {
                  validator: (_, value) => {
                    if (value) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("Hãy điền mật khẩu cũ!");
                    }
                  },
                },
              ]}
            >
              <Input.Password placeholder="Mật khẩu mới" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật khẩu mới"
              rules={[
                {
                  validator: (_, value) => {
                    if (value) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("Hãy điền mật khẩu mới!");
                    }
                  },
                },
              ]}
            >
              <Input.Password placeholder="Mật khẩu mới" />
            </Form.Item>
            <Form.Item
              name="password2"
              label="Nhập lại mật khẩu mới"
              rules={[
                {
                  validator: (_, value) => {
                    if (value === form.getFieldValue("password") && value) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("Mật khẩu mới không khớp");
                    }
                  },
                },
              ]}
            >
              <Input.Password placeholder="Nhập lại mật khẩu mới" />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ marginTop: 10, width: 70 }}
                type="primary"
                htmlType="submit"
              >
                Gửi
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </PageHeader>
    </div>
  );
}
