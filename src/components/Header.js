import React from "react";
import { Menu, Layout, Button } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./Header.css";

const { Header } = Layout;
const Headers = () => {
  function getItem(key, label, icon, callbackFn) {
    return {
      key,
      label,
      icon,
      onClick: callbackFn,
    };
  }

  const items = [
    getItem("home", <a href="/home">Homepage</a>, <DesktopOutlined />),
    getItem(
      "customer/login",
      <a href="/customer/login">Login</a>,
      <DesktopOutlined />
    ),
    getItem(
      "customer/mainscreen",
      <a href="/customer/mainscreen">MainScreen</a>,
      <DesktopOutlined />
    ),
  ];

  return (
    <Header>
      <Menu
        className="menu"
        theme="dark"
        defaultSelectedKeys={["home"]}
        mode="horizontal"
        //items={items}
      >
        <Menu.Item className="mainscreen" key="customer/mainscreen">
          <Link to="/customer/mainscreen">Main Screen</Link>
        </Menu.Item>
        <Menu.Item className="register" key="customer/register">
          <Link to="/customer/register">Register</Link>
        </Menu.Item>
        <Menu.Item className="login" key="customer/login">
          <Link to="/customer/login">Login</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Headers;
