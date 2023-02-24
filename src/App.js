import React, { useCallback, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Menu } from "antd";
import { DesktopOutlined } from "@ant-design/icons";
import { Provider as ReduxProvider } from "react-redux";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import store from "./redux/store";

const { Header, Content, Footer } = Layout;

export default function App() {
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
      <a href="/customer/login">login</a>,
      <DesktopOutlined />
    ),
  ];

  return (
    <ReduxProvider store={store}>
      <Router>
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
              <Routes>
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/customer/login" element={<LoginScreen />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
              </Routes>
            </Content>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              Insurance Card for Motorbikes
            </Footer>
          </Layout>
        </Layout>
      </Router>
    </ReduxProvider>
  );
}
