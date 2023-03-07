import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { Button, Layout, Menu, theme } from "antd";
import { useToken } from "antd/es/theme/internal";
import {
  DesktopOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPassword from "./screens/ForgotPassword";

import store from "./redux/store";
import { ROUTES } from "./constants/routerConst";

import "./App.style.css";

const { Header, Content, Footer } = Layout;

export default function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  function getItem(key, label, icon, callbackFn) {
    return {
      key,
      label,
      icon,
      onClick: callbackFn,
    };
  }

  const items = [
    getItem("home", <a href="/home">Home</a>, <DesktopOutlined />),
    getItem("login", <a href="/customer/login">Login</a>, <DesktopOutlined />),
    getItem(
      "register",
      <a href="/customer/register">Register</a>,
      <UserAddOutlined />
    ),
    getItem(
      "resetPassword",
      <a href="/customer/password/reset">Reset Password</a>,
      <UserAddOutlined />
    ),
    getItem(
      "/customer/forgotpassword",
      <a href="/customer/forgotpassword">Forget password</a>,
      <UserAddOutlined />
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
          <Header style={{backgroundColor: colorBgContainer}}>
            <div className="logo" />
            <Menu
              theme="light"
              defaultSelectedKeys={["home"]}
              mode="horizontal"
              style={{ display: "block", }}
              className="menu-items"
            >
              <Menu.Item
                className="menu-item-login"
                style={{ float: "right" }}
                disabled
              >
                <Button
                  type="link"
                  className="button-login"
                  icon={<UserOutlined />}
                  href={ROUTES.CUSTOMER_LOGIN_ROUTER}
                >
                  Đăng nhập
                </Button>
              </Menu.Item>
            </Menu>
          </Header>
          <Layout className="site-layout">
            <Content
              style={{
                margin: "0 16px",
              }}
            >
              <Routes>
                <Route path={ROUTES.HOME_ROUTER} element={<HomeScreen />} />
                <Route
                  path={ROUTES.CUSTOMER_LOGIN_ROUTER}
                  element={<LoginScreen />}
                />
                <Route
                  path={ROUTES.CUSTOMER_REGISTER_ROUTER}
                  element={<RegisterScreen />}
                />
                <Route path="/customer/password/reset" />
                <Route
                  path="/customer/forgotpassword"
                  element={<ForgotPassword />}
                />
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
