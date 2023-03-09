import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
export default function RequestContractScreen() {
  const location = useLocation();
  const contractTypeDetails = location.state
    ? location.state.contractTypeDetails
    : {};
  const [form] = Form.useForm();
  const startDate = Form.useWatch("startDate", form);
  const handleSelectDuration = useCallback(
    (value) => {
      let splitSDate = startDate.split("-");
      splitSDate[0] = String(parseInt(splitSDate[0]) + parseInt(value));
      form.setFieldValue("endDate", splitSDate.join("-"));
    },
    [startDate, JSON.stringify(form)]
  );
  return (
    <div>
      <h1>Thông tin bảo hiểm</h1>
      <Form
        form={form}
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
          typeId: contractTypeDetails.id,
          managerId: contractTypeDetails.managerId,
          contractType: contractTypeDetails.name,
          vehicleType: contractTypeDetails.vehicleType,
          insuranceLevel: contractTypeDetails.insuranceLevel,
          price: contractTypeDetails.price,
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
              message: "Hãy nhập số biển kiểm soát.",
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
              message: "Hãy nhập số biển kiểm soát.",
            },
          ]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Thời hạn" name="duration">
          <Select
            defaultActiveFirstOption
            style={{
              width: 120,
            }}
            options={[
              {
                value: "1",
                label: "1 năm",
              },
              {
                value: "2",
                label: "2 năm",
              },
              {
                value: "3",
                label: "3 năm",
              },
            ]}
            onChange={handleSelectDuration}
          />
        </Form.Item>
        <Form.Item
          label="Ngày kết thúc"
          name="endDate"
          rules={[
            {
              required: true,
              message: "Hãy nhập số biển kiểm soát.",
            },
          ]}
        >
          <Input type="date" readOnly />
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
