import { Button, Checkbox, Form, Input } from "antd";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { customerRegister } from "../../redux/features/customer";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function RegisterScreen () {
  const dispatch = useDispatch();
  const handleSubmit = useCallback(async (values) => {
    await dispatch(customerRegister(values));
  })

  return (
    <div>
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
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
              marginBottom: '0px'
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
              required: true,
              message: "Hãy nhập tên người dùng!",
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
              required: true,
              message: "Hãy nhập mật khẩu!",
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
              required: true,
              message: "Hãy nhập lại mật khẩu!",
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
              required: true,
              message: "Hãy nhập gmail của bạn!",
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
              required: true,
              message: "Hãy nhập số điện thoại của bạn!",
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
              required: true,
              message: "Hãy nhập số căn cước công dân của bạn!",
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
          <Button type="primary" htmlType="submit" onSubmit={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
