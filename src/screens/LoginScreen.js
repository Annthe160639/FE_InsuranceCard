import { VerticalAlignMiddleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { alignPropType } from "react-bootstrap/esm/types";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginScreen = () => {
  return (
    <Form
      className="grow flex flex-col justify-center"
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      style={{
        maxWidth: "100vw",
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url('https://haycafe.vn/wp-content/uploads/2021/12/Hinh-anh-thanh-pho-hinh-nen-thanh-pho.jpg')",
      }}
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="">
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <h1 className="text-3xl text-center text-white">ĐĂNG NHẬP</h1>
        </Form.Item>

        <Form.Item
          id="text-white"
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <Checkbox className="text-white">Remember me</Checkbox>
            <Button
              type="link"
              htmlType="submit"
              style={{ paddingTop: "0px" }}
              className="text-white"
            >
              Quên mật khẩu
            </Button>
          </div>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-600 rounded-lg"
          >
            Đăng nhập
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default LoginScreen;
