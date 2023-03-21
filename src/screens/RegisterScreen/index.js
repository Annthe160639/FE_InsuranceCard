import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { customerRegister } from "../../redux/features/customer";
import { createNotification } from "../../redux/features/notification";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routerConst";
import Joi from "joi";

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = useCallback(async (values) => {
    const { error, payload } = await dispatch(customerRegister(values));

    await dispatch(
      createNotification({
        type: error ? "error" : "success",
        message: error
          ? payload
          : "Đăng kí thành công. Vui lòng kiểm tra mail để xác thực tài khoản",
      })
    );

    if (!error) {
      navigate(ROUTES.CUSTOMER_LOGIN);
    }
  });

  return (
    <>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
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
        onFinish={handleSubmit}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          wrapperCol={{
            span: 16,
            offset: 6,
          }}
        >
          <h1
            style={{
              fontSize: 24,
              marginBottom: "0px",
            }}
          >
            ĐĂNG KÝ
          </h1>
        </Form.Item>

        <Form.Item
          label="Tên người dùng"
          name="username"
          rules={[
            {
              validator: (_, value) => {
                const { error } = Joi.string()
                  .alphanum()
                  .min(3)
                  .max(30)
                  .required()
                  .validate(value);
                if (!error) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Hãy nhập tên người dùng");
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              validator: (_, value) => {
                const { error } = Joi.string()
                  .alphanum()
                  .min(3)
                  .max(255)
                  .required()
                  .validate(value);
                if (!error) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Hãy nhập mật khẩu");
                }
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Nhập lại mật khẩu"
          name="password2"
          rules={[
            {
              validator: (_, value) => {
                if (value === form.getFieldValue("password") && value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Mật khẩu không khớp");
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên"
          name="name"
          rules={[
            {
              required: true,
              message: "Hãy nhập tên của bạn!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Gmail"
          name="gmail"
          rules={[
            {
              validator: (_, value) => {
                const { error } = Joi.string()
                  .email({ tlds: { allow: false } })
                  .validate(value);
                if (!error) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Email không hợp lệ");
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              validator: (_, value) => {
                const { error } = Joi.string()
                  .length(10)
                  .pattern(/^[0-9]+$/)
                  .required()
                  .validate(value);
                if (!error) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Số điện thoại không hợp lệ!");
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[
            {
              required: true,
              message: "Hãy nhập địa chỉ của bạn!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Căn cước công dân"
          name="ci"
          rules={[
            {
              validator: (_, value) => {
                const { error } = Joi.string()
                  .length(10)
                  .pattern(/^[0-9]+$/)
                  .required()
                  .validate(value);
                if (!error) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Số CMND/CCCD không hợp lệ!");
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
