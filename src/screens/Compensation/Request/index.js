import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, Input, InputNumber, DatePicker, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  customerLogin,
  fetchAllCustomerApproveContract,
} from "../../../redux/features/customer";
import { setUser } from "../../../redux/features/user";
import { PageContainer } from "@ant-design/pro-components";
import Joi, { date } from "joi";
import { uploadImage } from "../../../redux/features/image";
import { customerCompensationRequest } from "../../../redux/features/compensation";
import { createNotification } from "../../../redux/features/notification";
import { ROUTES } from "../../../constants/routerConst";

export default function RequestCompensation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(({ user: { user } }) => user);

  const [customerContracts, setCustomerContracts] = useState([]);

  const handleFormSubmit = useCallback(async (values) => {
    values.images = "https://i.imgflip.com/5zn5dt.jpg";

    const { error } = await dispatch(
      customerCompensationRequest(values)
    );
    await dispatch(
      createNotification({
        type: error ? "error" : "success",
        message: error ? error : "Gửi đơn yêu cầu đền bù thành công",
      })
    );

    navigate(ROUTES.CUSTOMER_COMPENSATION_LIST)
  }, []);

  const fetchCustomerContract = useCallback(async () => {
    const { error, payload } = await dispatch(
      fetchAllCustomerApproveContract()
    );
    setCustomerContracts(payload);
  }, []);

  useEffect(() => {
    fetchCustomerContract();
  }, []);

  return (
    <PageContainer
      title="Yêu cầu đền bù"
      style={{ backgroundColor: "white", margin: "16px 0" }}
    >
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={handleFormSubmit}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item wrapperCol={{ span: 15 }} style={{ margin: 0 }}>
          <Form.Item
            label="Nơi xảy ra tai nạn"
            name="accidentAddress"
            rules={[
              {
                required: true,
                message: "Vui lòng điển nơi xảy ra tai nạn!",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(70% - 8px)",
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Thời điểm xảy ra"
            name="accidentTime"
            wrapperCol={5}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(30% - 8px)",
              margin: "0 8px",
            }}
          >
            <DatePicker
              disabledDate={(d) => d.isAfter(new Date().toLocaleDateString())}
              format="DD-MM-YYYY"
            />
          </Form.Item>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 15 }} style={{ margin: 0 }}>
          <Form.Item
            label="Hợp đồng"
            name="contractId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn hợp đồng!",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(70% - 8px)",
            }}
          >
            <Select
              options={customerContracts.map(({ contractType, id }) => ({
                value: id,
                label: contractType?.name,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Số tiền muốn đền bù"
            name="payment"
            style={{
              display: "inline-block",
              width: "calc(30% - 8px)",
              margin: "0 8px",
            }}
            rules={[
              {
                validator: (_, value) => {
                  const { error } = Joi.number()
                    .min(1)
                    .max(100)
                    .validate(value);
                  if (!error) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Vui lòng nhập 1-100% đền bù!");
                  }
                },
              },
            ]}
          >
            <InputNumber
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => value.replace("%", "")}
            />
          </Form.Item>
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
    </PageContainer>
  );
}
