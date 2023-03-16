import { Button, Col, Form, Input, Row, Space } from "antd";
import { map } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routerConst";
import {
  fetchCustomerInfor,
  updateUserProfile,
} from "../../redux/features/customer";
import { createNotification } from "../../redux/features/notification";
import { deleteUser } from "../../redux/features/user";
import s from "./style.css";
export default function EditProfileScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [customerInfo, setCustomerIfo] = useState({});

  const handleEditProfile = useCallback(async (values) => {
    const { error, payload } = await dispatch(
      updateUserProfile({
        ...values,
        password: null,
        managerId: null,
        isActive: true,
      })
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

  const handleLogout = useCallback(async () => {
    const { error } = await dispatch(deleteUser());
    if (!error) {
      await dispatch(
        createNotification({
          type: "success",
          message: `Đăng xuất thành công`,
        })
      );
      navigate(ROUTES.HOME);
      window.location.reload(false);
    }
  }, []);

  useEffect(() => {
    handleFetchCustomer();
  }, []);

  return (
    <div className="profile">
      <Row span={15}>
        <Col span={8} className="left">
          <div className="avatar">
            <img src="../../jisoo.png"></img>
          </div>
          <Button type="primary" htmlType="submit">
            Thay đổi ảnh
          </Button>

          <Button type="primary" htmlType="submit">
            Đổi mật khẩu
          </Button>

          <Button className="logout" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Col>
        <Col span={15} className="right">
          <div
            style={{
              textAlign: "center",
            }}
          >
            <h1>THÔNG TIN CÁ NHÂN</h1>
            <Form
              name="basic"
              labelCol={{
                span: 7,
              }}
              wrapperCol={{
                span: 17,
              }}
              style={{
                maxWidth: 600,
                margin: "0 auto",
              }}
              initialValues={{
                remember: true,
              }}
              fields={map(customerInfo, (v, k) => ({
                name: k,
                value: v,
              }))}
              onFinish={handleEditProfile}
              autoComplete="off"
            >
              <Form.Item label="Tên đăng nhập" name="username">
                <Input readOnly placeholder="Tên đăng nhập" />
              </Form.Item>

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
                <Input placeholder="Tên" />
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
                <Input placeholder="Số điện thoại" />
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
                <Input placeholder="Gmail" />
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
                <Input placeholder="Địa chỉ" />
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
                <Input placeholder="Căn cước công dân" />
              </Form.Item>
              <div>
                <Form.Item
                  wrapperCol={{
                    span: 24,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Lưu
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
}
