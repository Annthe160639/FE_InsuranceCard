import { Button, Col, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { insertContractType } from "../../../../redux/features/manager";
import { createNotification } from "../../../../redux/features/notification";
import { ROUTES } from "../../../../constants/routerConst";

export default function AddContractTypeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(({ user: { user } }) => user);

  const handleSubmitForm = useCallback(async (values) => {
    const { error } = await dispatch(
      insertContractType({ ...values, managerId: user.id })
    );

    await dispatch(
      createNotification({
        type: error ? "error" : "success",
        message: error ? `Có lỗi xảy ra khi thêm mới loại hợp đồng` : "Thêm loại hợp đồng thành công",
      })
    );

    if (!error) {
      navigate(ROUTES.MANAGER_CONTRACTYPE);
    }
  }, []);
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
        onFinish={handleSubmitForm}
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
        <Form.Item label="Mô tả" name="description">
          <TextArea rows={5} />
        </Form.Item>

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
