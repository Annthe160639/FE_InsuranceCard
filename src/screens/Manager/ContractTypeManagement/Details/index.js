import { Button, Col, Form, Input, Popconfirm, Row, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { entries, map } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../../../constants/routerConst";
import {
  contractTypeDetailsById,
  deleteContractType,
} from "../../../../redux/features/contract";
import {
  updateContractType,
} from "../../../../redux/features/manager";
import { createNotification } from "../../../../redux/features/notification";

export default function ContractTypeDetailsScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [contractTypeDetails, setContractTypeDetails] = useState({});

  const handleGetContractType = useCallback(async () => {
    const { payload: contractTypeDetails } = await dispatch(
      contractTypeDetailsById({ id })
    );
    console.log(contractTypeDetails);
    setContractTypeDetails(contractTypeDetails);
  }, []);

  const handleSubmitForm = useCallback(async (values) => {
    const { error } = await dispatch(updateContractType(values));

    await dispatch(
      createNotification({
        type: error ? "error" : "success",
        message: error
          ? `Có lỗi xảy ra khi cập nhật loại hợp đồng`
          : "Cập nhật thông tin loại hợp đồng thành công",
      })
    );

    if (!error) {
      navigate(ROUTES.MANAGER_CONTRACTYPE_ROUTER);
    }
  }, []);

  const handleDeleteContractType = useCallback(async () => {
    const { error } = await dispatch(
      deleteContractType({ id: contractTypeDetails.id })
    );

    await dispatch(
      createNotification({
        type: error ? "error" : "success",
        message: error
          ? `Có lỗi xảy ra khi xoá loại hợp đồng`
          : "Xoá loại hợp đồng thành công",
      })
    );

    if (!error) {
      navigate(ROUTES.MANAGER_CONTRACTYPE_ROUTER);
    }
  });

  useEffect(() => {
    handleGetContractType();
  }, [id]);
  return (
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
      fields={map(contractTypeDetails, (v, k) => ({
        name: k,
        value: v,
      }))}
      initialValues={{ name: contractTypeDetails.name }}
      onFinish={handleSubmitForm}
      autoComplete="off"
    >
      <Row>
        <Col span={24}>
          <h1>Thông tin bảo hiểm</h1>
        </Col>
      </Row>
      <Form.Item name="id" hidden></Form.Item>
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
          offset: 15,
        }}
      >
        <Space>
          <Popconfirm
            title="Xoá loại hợp đồng"
            description="Bạn có chắc muốn xoá loại hợp đồng này không?"
            onConfirm={handleDeleteContractType}
            okText="Có"
            cancelText="Không"
          >
            <Button danger>Xoá</Button>
          </Popconfirm>

          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
