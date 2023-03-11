import { Button, Form, Input, Row } from "antd";

export default function EditProfileScreen() {
  return (
    <div 
      
      style={{
        textAlign: "center"
      }}
    >
        <h1>THÔNG TIN CÁ NHÂN</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          margin: '0 auto'
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Tên đăng nhập"
          name="username"
          
        >
          <Input readOnly />
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
          label="CMND/CCCD"
          name="ci"
          rules={[
            {
              required: true,
              message: "Hãy nhập số CMND/CCCD của bạn!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <div 
          
        >
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >

          
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Thay đổi mật khẩu
          </Button>
        </Form.Item>
        </div>
      </Form>
    </div>
  );
}
