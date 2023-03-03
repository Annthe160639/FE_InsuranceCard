import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
export default function RequestContractScreen() {
  return (
    <div>
      <h1>Thông tin bảo hiểm</h1>
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
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Loại bảo hiểm"
          name="contractType"
          
          rules={[
            {
              required: false,
              
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Loại xe"
          name="vehicleType"
          
          rules={[
            {
              required: false,
              
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Giá"
          name="price"
          
          rules={[
            {
              required: false,
              
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Hạn mức bảo hiểm"
          name="insuranceLevel"
          
          rules={[
            {
              required: false,
              
            },
          ]}
        >
          <Input readOnly />
        </Form.Item>
        <Form.Item
          label="Biển kiểm soát"
          name="pattern"
          
          rules={[
            {
              required: true,
              message: "Hãy nhập số biển kiểm soát."
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày bắt đầu"
          name="startDate"
          
          rules={[
            {
              required: true,
              message: "Hãy nhập số biển kiểm soát."
            },
          ]}
        >
          <Input type="date"/>
        </Form.Item>

        <Form.Item
            label="Thời hạn"
            name="duration"

        >
            <Select
        defaultValue={"1 năm"}
        style={{
          width: 120,
        }}
        options={[
            {
                value: '1',
                label: '1 năm',
              },
              {
                value: '2',
                label: '2 năm',
              },
              {
                value: '3',
                label: '3 năm',
              },
        ]}
      />
        </Form.Item>
        <Form.Item
          label="Ngày kết thúc"
          name="endDate"
          
          rules={[
            {
              required: true,
              message: "Hãy nhập số biển kiểm soát."
            },
          ]}
        >
          <Input type="date" readOnly/>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        
      </Form>
    </div>
  );
}
