import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout, Menu } from "antd";
import { DesktopOutlined, UserAddOutlined } from "@ant-design/icons";
import { Provider as ReduxProvider } from "react-redux";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPassword from "./screens/ForgotPassword";

import store from "./redux/store";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import RequestContractScreen from "./screens/RequestContractScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import AddContractTypeScreen from "./screens/AddContractTypeScreen";
import EditContractTypeScreen from "./screens/EditContractTypeScreen";
import CheckCompensationScreen from "./screens/CheckCompensation";

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
    getItem("forgotpassword", <a href="/forgotpassword">Forgot password</a>, <UserAddOutlined />),
    getItem("editProfile", <a href="/customer/profile">Edit profile</a>, <UserAddOutlined />),
    getItem("addContractType", <a href="/manager/contract/type/add">Add new contract type</a>, <UserAddOutlined />),
    getItem("editContractType", <a href="/manager/contract/type/edit">Edit contract type</a>, <UserAddOutlined />),
    getItem("checkCompensation", <a href="/staff/compensation/check">Check compensation</a>, <UserAddOutlined />),

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
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/customer/contract/request" element={<RequestContractScreen />} />
                <Route path="/customer/profile" element={<EditProfileScreen />} />
                <Route path="/manager/contract/type/add" element={<AddContractTypeScreen />} />
                <Route path="/manager/contract/type/edit" element={<EditContractTypeScreen />} />
                <Route path="/staff/compensation/check" element={<CheckCompensationScreen />} />

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
