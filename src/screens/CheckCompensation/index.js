import { Button, Form, Input, Select } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
export default function CheckCompensationScreen() {
  return (
    <div>
      <h1>YÊU CẦU ĐỀN BÙ</h1>
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
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Thông tin hợp đồng" name="contract">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="Ảnh" name="images">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="Địa điểm tai nạn" name="accidentAddress">
          <Input readOnly />
        </Form.Item>
        <Form.Item label="Thời gian tai nạn" name="accidentAddress">
          <Input type="date" readOnly />
        </Form.Item>
        <Form.Item
            label="Mức độ tai nạn"
            name="accidentLevel"
            rules={[
              {
                required: true,
                message: "Hãy chọn mức độ tai nạn."
              },
            ]}
            style={{
              textAlign: 'left',
            }}
        >
            <Select
        defaultValue={"10%"}
        style={{
          textAlign: 'left',
          width: 120,
        }}
        options={[
              {
                value: '10',
                label: '10%',
              },
              {
                value: '20',
                label: '20%',
              },
              {
                value: '30',
                label: '30%',
              },
              {
                value: '50',
                label: '50%',
              },
              {
                value: '70',
                label: '70%',
              },
              {
                value: '100',
                label: '100%',
              },
        ]}
      />
        </Form.Item>
        <Form.Item label="Số tiền đền bù" name="payment">
          <Input readOnly placeholder="Mức độ bảo hiểm * Mức độ tai nạn" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Chấp nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
