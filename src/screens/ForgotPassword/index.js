import { Button, Form, Input, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { customerResetPassword } from "../../redux/features/customer";
import { createNotification } from "../../redux/features/notification";

export default function ForgotPassword() {
  const dispatch = useDispatch();

  const handleSubmitResetPassword = useCallback(async (values) => {
    console.log(values);
    const { error } = await dispatch(customerResetPassword(values));
    await dispatch(
      createNotification({
        type: error ? "error" : "success",
        message: error ? error : "Gửi mail thành công! Vui lòng kiểm tra mail!",
      })
    );
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
            Quên mật khẩu?
          </Title>
          <Paragraph>
            Đừng lo! Hãy điền tên đăng nhập bạn đã đăng kí để lấy lại mật khẩu
          </Paragraph>
          <Form layout="vertical" onFinish={handleSubmitResetPassword}>
            <Form.Item
              name="username"
              label="Tên đăng nhập"
              rules={[
                {
                  required: true,
                  message: "Hãy điền tên đăng nhập!",
                },
              ]}
            >
              <Input placeholder="Điền tên đăng nhập" />
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
