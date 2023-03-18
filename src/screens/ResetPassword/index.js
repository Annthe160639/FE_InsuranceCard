import { Button, Form, Input, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createNotification } from "../../redux/features/notification";
import { ROUTES } from "../../constants/routerConst";
import { customerResetNewPassword } from "../../redux/features/customer";
export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const key = searchParams.get("key");
  const [form] = Form.useForm();

  const handleSubmitResetPassword = useCallback(async (values) => {
    values.key = key;
    console.log(key)
    const { error } = await dispatch(customerResetNewPassword(values));
    await dispatch(
      createNotification({
        type: error ? "error" : "success",
        message: error ? error : "Cập nhật mật khẩu mới thành công",
      })
    );
    if (!error) {
      navigate(ROUTES.CUSTOMER_LOGIN);
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
      <Layout
        style={{
          backgroundColor: "white",
          maxWidth: 600,
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          boxShadow: "0px 0px 30px -20px #666",
        }}
      >
        <Content
          style={{
            backgroundColor: "white",
            width: 500,
            maxHeight: 200,
            padding: "10px 20px",
            textAlign: "center",
          }}
        >
          <Title level={4} style={{ fontWeight: 700 }}>
            Khôi phục mật khẩu mới?
          </Title>

          <Form
            layout="vertical"
            onFinish={handleSubmitResetPassword}
            form={form}
          >
            <Form.Item
              name="password"
              label="Mật khẩu mới"
              rules={[
                {
                  validator: (_, value) => {
                    if (value) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("Hãy điền mật khẩu mới");
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
      </Layout>
    </div>
  );
}
