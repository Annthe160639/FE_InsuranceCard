import React from "react";
import { Menu, Layout } from "antd";
import { DesktopOutlined } from "@ant-design/icons";

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
  const onClick = (e) => {
    console.log("click", e);
  };
  return (
    <Header>
      <div className="logo" />
      <Menu
        onClick={onClick}
        theme="dark"
        defaultSelectedKeys={["home"]}
        mode="horizontal"
        items={items}
      />
    </Header>
  );
};

export default Headers;
