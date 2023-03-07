import { Button, Col, Form, Input, Row } from "antd";
import './style.css'
export default function EditProfileScreen() {
  return (
    <Row span={15}>
      <Col span={8} className="left">
        <div className="avatar">
          <img src="../../jisoo.png"></img>
          
          
        
        </div>
        <Button type="primary" htmlType="submit">
            Thay đổi ảnh
          </Button>

          <Button type="primary" htmlType="submit">
            Đổi mật khẩu
          </Button>
          
          <Button className="logout" type="primary" htmlType="submit">
            
            Đăng xuất
          </Button>
      </Col>
      <Col span={15} className="right">
      <div 
      
      style={{
        textAlign: "center"
      }}
    >
        <h1>THÔNG TIN CÁ NHÂN</h1>
      <Form
        name="basic"
        labelCol={{
          span: 7,
        }}
        wrapperCol={{
          span: 17,
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
          <Input readOnly placeholder="Tên đăng nhập" />
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
          <Input placeholder="Tên"/>
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
          <Input placeholder="Số điện thoại"/>
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
          <Input placeholder="Gmail" />
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
          <Input placeholder="Địa chỉ"/>
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
          <Input placeholder="Căn cước công dân"/>
        </Form.Item>
        <div 
          
        >
        <Form.Item
          wrapperCol={{
           
            span: 24,
          }}
        >

          
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
        
        </div>
      </Form>
    </div></Col>
    </Row>
  );
}
