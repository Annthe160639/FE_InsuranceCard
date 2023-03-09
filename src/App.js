import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Provider as ReduxProvider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPassword from "./screens/ForgotPassword";

import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import RequestContractScreen from "./screens/RequestContractScreen";
import RequestCompensation from "./screens/RequestCompensation";
import EditProfileScreen from "./screens/EditProfileScreen";
import AddContractTypeScreen from "./screens/AddContractTypeScreen";
import EditContractTypeScreen from "./screens/EditContractTypeScreen";
import CheckCompensationScreen from "./screens/CheckCompensation";
import { ROUTES } from "./constants/routerConst";
import store from "./redux/store";
import Headers from "./components/Header";

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
    getItem("register", <a href="/customer/register">Register</a>, <UserAddOutlined />),
    getItem("resetPassword", <a href="/customer/password/reset">Reset Password</a>, <UserAddOutlined />),
    getItem("forgotpassword", <a href="/forgotpassword">Forgot password</a>, <UserAddOutlined />),
    getItem("requestCompensation", <a href="/customer/compensation/request">Request Compensation</a>, <UserAddOutlined />),
    getItem("editProfile", <a href="/customer/profile">Edit profile</a>, <UserAddOutlined />),
    getItem("addContractType", <a href="/manager/contract/type/add">Add new contract type</a>, <UserAddOutlined />),
    getItem("editContractType", <a href="/manager/contract/type/edit">Edit contract type</a>, <UserAddOutlined />),
    getItem("editContractType", <a href="/staff/compensation/check">Check compensation</a>, <UserAddOutlined />),
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
          <Headers />
          <Layout className="site-layout">
            {localStorage.getItem("jwtToken") && (
              <Sider style={{ margin: "16px 0" }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{
                    height: "100%",
                    borderRight: 0,
                  }}
                >
                  <Menu.Item key={"contract"}>
                    <Link to={ROUTES.CUSTOMER_CONTRACT_HISTORY}>Hợp đồng</Link>
                  </Menu.Item>
                </Menu>
              </Sider>
            )}
            <Content
              style={{
                margin: "0 16px",
              }}
            >
              <Routes>
                <Route index path={ROUTES.HOME_ROUTER} element={<HomeScreen />} />
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
