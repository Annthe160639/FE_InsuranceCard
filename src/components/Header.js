import React from "react";
import { Menu, Layout } from "antd";
import { DesktopOutlined } from "@ant-design/icons";

const {Header} = Layout;
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
  ];
  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["home"]}
        mode="horizontal"
        items={items}
      />
    </Header>
  );
};

export default Headers;
