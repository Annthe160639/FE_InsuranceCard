import React, { useCallback, useEffect, useState } from "react";
import { Menu, Layout, theme, Row, Col, Button, Image } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../constants/routerConst";
import { getUserSession, logout } from "../redux/features/customer";

const { Header } = Layout;
export default function Headers() {
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState({});

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, []);

  const handleGetCustomer = useCallback(async () => {
    try {
      const sessionCustomer = JSON.parse(localStorage.getItem("customer"));
      setCustomer(sessionCustomer);
    } catch {}
  });

  useEffect(() => {
    handleGetCustomer();
  }, []);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
                <Image width="60%" src="../logo.png" preview={false} />
              </Link>
            </Menu.Item>
          </Col>
          <Col span={16} type="flex" justify="center" align="center">
            <Menu.Item className="menu-pages" key={"home"}>
              <Button
                type="link"
                icon={<HomeOutlined />}
                href={ROUTES.HOME_ROUTER}
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
              <Button
                type="link"
                className="button-login"
                icon={<UserOutlined />}
                href={
                  customer && customer.username
                    ? ROUTES.HOME_ROUTER
                    : ROUTES.CUSTOMER_LOGIN_ROUTER
                }
              >
                {customer && customer.username ? (
                  <>
                    {customer.username}
                    <Button type="link" onClick={handleLogout}>
                      Log out
                    </Button>
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            </Menu.Item>
          </Col>
        </Row>
      </Menu>
    </Header>
  );
}
