import { Button, Col, Form, Input, Row, Select } from "antd";
import Title from "antd/es/typography/Title";
import { concat, isEmpty, map } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routerConst";
import { requestNewContract } from "../../redux/features/contract";
import { fetchCustomerInfor } from "../../redux/features/customer";
import { createNotification } from "../../redux/features/notification";
export default function RequestContractScreen() {
  const user = useSelector(({ user: { user } }) => user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [customerInfo, setCustomerInfo] = useState({});

  const contractTypeDetails = location.state
    ? location.state.contractTypeDetails
    : {};

  if (!contractTypeDetails) {
    navigate(ROUTES.HOME);
  }

  const startDate = Form.useWatch("startDate", form);
  const duration = Form.useWatch("duration", form);
  const handleFormSubmit = useCallback(async (values) => {
    delete values.duration;
    const { error } = await dispatch(requestNewContract(values));

    await dispatch(
      createNotification({
        type: error ? "error" : "success",
        message: error ? "Có lỗi xảy ra trong quá trình mua" : "Mua thành công",
      })
    );

    if (!error) {
      navigate(ROUTES.CUSTOMER_CONTRACT_HISTORY);
    }
  }, []);

  const handleSelectDuration = useCallback(
    (value) => {
      console.log(duration);
      if (parseInt(duration) && startDate) {
        let splitSDate = startDate.split("-");
        splitSDate[0] = String(parseInt(splitSDate[0]) + parseInt(duration));
        form.setFieldValue("endDate", splitSDate.join("-"));
      }
    },
    [startDate, duration]
  );

  const handleFetchCustomer = useCallback(async () => {
    const { error, payload } = await dispatch(fetchCustomerInfor());
    if (payload) {
      console.log(payload);
      setCustomerInfo(payload);
    } else if (error) {
      await dispatch(
        createNotification({
          type: error ? "error" : "success",
          message: error ? `Có lỗi xảy ra khi lấy thông tin người dung` : "",
        })
      );
    }
  }, []);

  useEffect(() => {
    handleSelectDuration(startDate);
  }, [startDate, duration, handleSelectDuration]);

  useEffect(() => {
    if (isEmpty(user)) {
      navigate(ROUTES.CUSTOMER_LOGIN);
    } else {
      handleFetchCustomer();
    }
  }, [user]);
  return (
    <div style={{ backgroundColor: "", textAlign: "center" }}>
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
          contractType: {
            id: contractTypeDetails.id,
            managerId: contractTypeDetails.managerId,
            name: contractTypeDetails.name,
            vehicleType: contractTypeDetails.vehicleType,
            insuranceLevel: contractTypeDetails.insuranceLevel,
            price: contractTypeDetails.price,
          },
          buyer: {
            ci: customerInfo.ci,
          },
          duration: 1,
        }}
        fields={map(customerInfo, (v, k) => ({
          name: ["buyer", k],
          value: v,
        }))}
        onFinish={handleFormSubmit}
        autoComplete="off"
      >
        <Row>
          <Col offset={6} span={18}>
            <h1>Thông tin bảo hiểm</h1>
          </Col>
        </Row>
        <Form.Item name={["contractType", "id"]} hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label="Loại bảo hiểm"
          name={["contractType", "name"]}
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
          name={["contractType", "vehicleType"]}
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
          name={["contractType", "price"]}
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
          name={["contractType", "insuranceLevel"]}
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
            defaultValue="1"
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
        <Form.Item wrapperCol={{ offset: 6 }}>
          <Title level={4} style={{ margin: 0, textAlign: "left" }}>
            Thành tiền:{" "}
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "VND",
            }).format(
              parseInt(form.getFieldValue(["contractType", "price"])) *
                parseInt(form.getFieldValue("duration")) ?? 0
            )}
          </Title>
        </Form.Item>
        <Row>
          <Col offset={6} span={18}>
            <h1>Thông tin người mua</h1>
          </Col>
        </Row>
        <Form.Item
          label="CMTND/CCCD"
          name={["buyer", "ci"]}
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
          name={["buyer", "name"]}
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
          name={["buyer", "address"]}
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
          name={["buyer", "phone"]}
          rules={[
            {
              required: true,
              message: "Hãy nhập số điện thoại.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Ghi chú" name={["buyer", "note"]}>
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
