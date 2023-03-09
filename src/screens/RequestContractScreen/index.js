import { Button, Col, Form, Input, Row, Select } from "antd";
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
    <div style={{ backgroundColor: "lightsteelblue", textAlign: "center" }}>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        style={{
          maxWidth: 600,
          margin: "0 auto",
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
        <Row>
          <Col offset={6} span={18}>
            <h1>Thông tin bảo hiểm</h1>
          </Col>
        </Row>
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
              message: "Hãy chọn ngày bắt đầu.",
            },
          ]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item
          label="Thời hạn"
          name="duration"
          rules={[
            {
              required: true,
              message: "Hãy chọn thời hạn.",
            },
          ]}
          style={{
            textAlign: "left",
          }}
        >
          <Select
            defaultValue={"1 năm"}
            style={{
              textAlign: "left",
              width: 120,
            }}
            onChange={handleSelectDuration}
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
          />
        </Form.Item>
        <Form.Item label="Ngày kết thúc" name="endDate">
          <Input type="date" readOnly />
        </Form.Item>
        <Row>
          <Col offset={6} span={18}>
            <h1>Thông tin người mua</h1>
          </Col>
        </Row>
        <Form.Item
          label="CMTND/CCCD"
          name="ci"
          rules={[
            {
              required: true,
              message: "Hãy nhập số căn cước công dân.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Họ và Tên"
          name="name"
          rules={[
            {
              required: true,
              message: "Hãy nhập tên người mua.",
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
              message: "Hãy nhập địa chỉ.",
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
              message: "Hãy nhập số điện thoại.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Ghi chú" name="name">
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 18,
          }}
        >
          <Button type="primary" htmlType="submit">
            Gửi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
