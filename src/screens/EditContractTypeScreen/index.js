import { Button, Col, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
export default function EditContractTypeScreen() {
  return (
    <div style={{ textAlign: "center" }}>
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        style={{
          maxWidth: 600,
          margin: "0 auto",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col span={24}>
            <h1>Thông tin bảo hiểm</h1>
          </Col>
        </Row>
        <Form.Item
          label="Tên bảo hiểm"
          name="name"
          rules={[
            {
              required: true,
              message: "Hãy nhập tên loại bảo hiểm!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Loại xe"
          name="vehicleType"
          rules={[
            {
              required: true,
              message: "Hãy nhập loại xe!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giá"
          name="price"
          rules={[
            {
              required: true,
              message: "Hãy nhập giá loại bảo hiểm!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Hạn mức bảo hiểm"
          name="insuranceLevel"
          rules={[
            {
              required: true,
              message: "Hãy nhập hạn mức bảo hiểm!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Row>
          <Col offset={6} span={14}>
            <TextArea rows={5} />
          </Col>
        </Row>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
