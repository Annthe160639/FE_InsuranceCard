import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import { Provider as ReduxProvider } from "react-redux";
import "./App.css";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import MainScreen from "./screens/MainScreen/MainScreen";
import CreateContract from "./screens/Contract/CreateContract";
import RequestCompensation from "./screens/Compensation/RequestCompensation";
import ViewContract from "./screens/Contract/ViewContract";
import ViewCompensation from "./screens/Compensation/ViewCompensation";
import UpdateProfile from "./screens/Personal/UpdateProfile";
import Chat from "./screens/Personal/Chat";
import store from "./redux/store";
import Headers from "./components/Header";
import { Layout, Menu } from "antd";
import { DesktopOutlined, UserAddOutlined } from "@ant-design/icons";
import { Provider as ReduxProvider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPassword from "./screens/ForgotPassword";

import store from "./redux/store";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import RequestContractScreen from "./screens/RequestContractScreen";

const { Content, Footer } = Layout;

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
          <Headers></Headers>
          <Layout className="site-layout">
            <Content
              style={{
                margin: "0 16px",
              }}
            >
              <Routes>
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/customer/login" element={<LoginScreen />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/customer/mainscreen" element={<MainScreen />} />
                <Route path="/customer/createcontract" element={<CreateContract />} />
                <Route path="/customer/requestcompensation" element={<RequestCompensation />} />
                <Route path="/customer/viewcontract" element={<ViewContract />} />
                <Route path="/customer/viewcompensation" element={<ViewCompensation />} />
                <Route path="/customer/updateprofile" element={<UpdateProfile />} />
                <Route path="/customer/chat" element={<Chat />} />
                <Route path="/customer/register" element={<RegisterScreen />} />
                <Route path="/customer/password/reset" element={<ResetPasswordScreen />} />
<<<<<<< HEAD
                <Route path="/customer/forgotpassword" element={<ForgotPassword />} />
=======
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/customer/contract/request" element={<RequestContractScreen />} />
>>>>>>> main
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