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
import { DesktopOutlined } from "@ant-design/icons";
import LoginScreen from "./screens/LoginScreen";
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
  console.log(router);

  const items = [
    getItem("home", <a href="home">Homepage</a>, <DesktopOutlined />),
    getItem("login", <a href="login">Login</a>, <DesktopOutlined />),
  ];

  return (
    <Layout
      className="flex flex-col"
      style={{
        minHeight: "100vh",
      }}
    >
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          // defaultSelectedKeys={["home"]}
          mode="horizontal"
          items={items}
        />
      </Header>
      <Layout className="site-layout">
        <RouterProvider router={router} />
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
