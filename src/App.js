import "./App.css";
import HomePage from "./screens/HomeScreen";
import {
  createBrowserRouter,
  Router,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { Layout, Menu } from "antd";
import React, { useCallback, useState, useEffect } from "react";
import { DesktopOutlined, UserAddOutlined } from "@ant-design/icons";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
const { Header, Content, Footer } = Layout;

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/customer/register",
    element: <RegisterScreen />,
  },
]);

export default function App() {
  function getItem(key, label, icon, callbackFn) {
    return {
      key,
      label,
      icon,
      onClick: callbackFn,
    };
  }
  console.log(router)

  const items = [
    getItem("home", <a href="/home">Homepage</a>, <DesktopOutlined />),
    getItem("login", <a href="/login">login</a>, <DesktopOutlined />),
    getItem("register", <a href="/customer/register">Register</a>, <UserAddOutlined />),
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["home"]}
          mode="horizontal"
          items={items}
        />
      </Header>
      <Layout className="site-layout">
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <RouterProvider router={router}  />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Insurance card of motorbikes
        </Footer>
      </Layout>
    </Layout>
  );
}
