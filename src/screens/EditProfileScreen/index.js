import { Button, Form, Input, Space } from "antd";
import { map } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomerInfor,
  updateUserProfile,
} from "../../redux/features/customer";
import { createNotification } from "../../redux/features/notification";

export default function EditProfileScreen() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [customerInfo, setCustomerIfo] = useState({});

  const handleEditProfile = useCallback(async (values) => {
    const { error, payload } = await dispatch(
      updateUserProfile({ ...values, password: null })
    );

    await dispatch(
      createNotification({
        type: error ? "error" : "success",
        message: error
          ? `Có lỗi xảy ra khi cập nhật thông tin người dung`
          : "Cập nhật thông tin người dùng thành công",
      })
    );

    if (!error) {
      handleFetchCustomer();
    }
  }, []);

  const handleFetchCustomer = useCallback(async () => {
    const { error, payload } = await dispatch(fetchCustomerInfor());
    if (payload) {
      setCustomerIfo(payload);
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
    handleFetchCustomer();
  }, []);

  return (
    <>
      <h1>THÔNG TIN CÁ NHÂN</h1>
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
          margin: "0 auto",
        }}
        fields={map(customerInfo, (v, k) => ({
          name: k,
          value: v,
        }))}
        autoComplete="off"
        onFinish={handleEditProfile}
      >
        <Form.Item name="id" hidden></Form.Item>
        <Form.Item name="username" hidden></Form.Item>
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
          <Input />
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
          <Input />
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
          <Input />
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
          <Input />
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
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Space>
            <Button type="primary" htmlType="submit">
              Thay đổi mật khẩu
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
