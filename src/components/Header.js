import React, { useCallback, useEffect, useState } from "react";
import {
  Menu,
  Layout,
  theme,
  Row,
  Col,
  Button,
  Image,
  notification,
  Space,
} from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routerConst";
import { getUserSession, logout } from "../redux/features/customer";
import {
  createNotification,
  removeNotification,
} from "../redux/features/notification";
import { isFunction, last } from "lodash";

const { Header } = Layout;
export default function PageHeader() {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const alerts = useSelector(({ notification: { alerts } }) => alerts);
  const [currentUser, setCurrentUser] = useState({});

  const customer = useSelector(({ customer: { customer } }) => customer);
  const manager = useSelector(({ manager: { manager } }) => manager);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = useCallback(async () => {
    await dispatch(logout());
    await dispatch(
      createNotification({
        type: "success",
        message: `Đăng xuất thành công`,
      })
    );
    naviagate(ROUTES.HOME_ROUTER);
  }, []);

  useEffect(() => {
    const { type, message, description, onClose } = { ...last(alerts) };
    if (type && message) {
      dispatch(removeNotification());
      isFunction(onClose) && onClose();

      notification[type]({
        message,
        description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(alerts)]);

  useEffect(() => {
    if (customer) {
      setCurrentUser(customer);
    } else if (manager) {
      setCurrentUser(manager);
    }
  }, [JSON.stringify(customer), JSON.stringify(manager)]);

  useEffect(() => {
    notification.config({
      duration: 3,
      maxCount: 3,
    });
  }, []);

  return (
    <Header style={{ backgroundColor: colorBgContainer }}>
      <div className="logo" />
      <Menu
        theme="light"
        defaultSelectedKeys={["home"]}
        mode="horizontal"
        style={{ display: "block" }}
        className="menu-items"
      >
        <Row>
          <Col span={4}>
            <Menu.Item className="menu-logo" key={"logo"} disabled>
              <Link to={ROUTES.HOME_ROUTER}>
                <Image width="60%" src="/logo.png" preview={false} />
              </Link>
            </Menu.Item>
          </Col>
          <Col span={16} type="flex" justify="center" align="center">
            <Menu.Item className="menu-pages" key={"home"}>
              <Button
                type="link"
                icon={<HomeOutlined />}
                onClick={() => naviagate(ROUTES.HOME_ROUTER)}
              >
                Trang chủ
              </Button>
            </Menu.Item>
          </Col>
          <Col span={4}>
            <Menu.Item
              className="menu-login"
              key={"login"}
              style={{ padding: 0 }}
              disabled
            >
              <Space>
                <Link
                  to={
                    currentUser && currentUser.username
                      ? ROUTES.CUSTOMER_PROFILE_ROUTER
                      : ROUTES.CUSTOMER_LOGIN_ROUTER
                  }
                >
                  <Button
                    type="link"
                    className="button-login"
                    icon={<UserOutlined />}
                  >
                    {currentUser && currentUser.username ? (
                      <>{currentUser.username}</>
                    ) : (
                      "Đăng nhập"
                    )}
                  </Button>
                </Link>
                {currentUser && currentUser.username ? (
                  <Button type="link" onClick={handleLogout}>
                    Đăng xuất
                  </Button>
                ) : (
                  ""
                )}
              </Space>
            </Menu.Item>
          </Col>
        </Row>
      </Menu>
    </Header>
  );
}
