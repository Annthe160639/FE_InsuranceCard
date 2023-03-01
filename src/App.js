import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Menu } from "antd";
import { DesktopOutlined, UserAddOutlined } from "@ant-design/icons";
import { Provider as ReduxProvider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPassword from "./screens/ForgotPassword";

import store from "./redux/store";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";

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
    getItem("home", <a href="/home">Home</a>, <DesktopOutlined />),
    getItem("login", <a href="/customer/login">Login</a>, <DesktopOutlined />),
    getItem("register", <a href="/customer/register">Register</a>, <UserAddOutlined />),
    getItem("resetPassword", <a href="/customer/password/reset">Reset Password</a>, <UserAddOutlined />),
    getItem("/customer/forgotpassword", <a href="/customer/forgotpassword">Forget password</a>, <UserAddOutlined />),
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
                <Route path="/customer/login" element={<LoginScreen />} />
                <Route path="/customer/register" element={<RegisterScreen />} />
                <Route path="/customer/password/reset" element={<ResetPasswordScreen />} />
                <Route path="/customer/forgotpassword" element={<ForgotPassword />} />
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