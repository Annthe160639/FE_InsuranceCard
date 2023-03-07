import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { Button, Col, Image, Layout, Menu, Row, theme } from "antd";
import { Provider as ReduxProvider, useSelector } from "react-redux";
import {
  DesktopOutlined,
  HomeOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPassword from "./screens/ForgotPassword";
import MainScreen from "./screens/MainScreen/MainScreen";
import CreateContract from "./screens/Contract/CreateContract";
import RequestCompensation from "./screens/Compensation/RequestCompensation";
import ViewContract from "./screens/Contract/ViewContract";
import ViewCompensation from "./screens/Compensation/ViewCompensation";
import UpdateProfile from "./screens/Personal/UpdateProfile";
import RequestContractScreen from "./screens/RequestContractScreen";
import Chat from "./screens/Personal/Chat";

import { ROUTES } from "./constants/routerConst";

import store from "./redux/store";

import "./App.style.css";
import Headers from "./components/Header";
import Sider from "antd/es/layout/Sider";
import ListContracts from "./screens/Contract/ListContracts";
const { Content, Footer } = Layout;

export default function App() {
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
            <Content
              style={{
                margin: "0 16px",
              }}
            >
              <Routes>
                <Route path={'/'} element={<HomeScreen />} />
                <Route path={ROUTES.HOME_ROUTER} element={<HomeScreen />} />
                <Route
                  path={ROUTES.CUSTOMER_LOGIN_ROUTER}
                  element={<LoginScreen />}
                />
                <Route
                  path={ROUTES.CUSTOMER_REGISTER_ROUTER}
                  element={<RegisterScreen />}
                />
                <Route
                  path={ROUTES.CUSTOMER_CONTRACT_HISTORY}
                  element={<ListContracts />}
                />
                <Route path="/customer/password/reset" />
                <Route
                  path="/customer/forgotpassword"
                  element={<ForgotPassword />}
                />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/customer/mainscreen" element={<MainScreen />} />
                <Route
                  path="/customer/createcontract"
                  element={<CreateContract />}
                />
                <Route
                  path="/customer/requestcompensation"
                  element={<RequestCompensation />}
                />
                <Route
                  path="/customer/viewcontract"
                  element={<ViewContract />}
                />
                <Route
                  path="/customer/viewcompensation"
                  element={<ViewCompensation />}
                />
                <Route
                  path="/customer/updateprofile"
                  element={<UpdateProfile />}
                />
                <Route path="/customer/chat" element={<Chat />} />
                <Route
                  path="/customer/forgotpassword"
                  element={<ForgotPassword />}
                />
                <Route path="/customer/mainscreen" element={<MainScreen />} />
                <Route
                  path="/customer/createcontract"
                  element={<CreateContract />}
                />
                <Route
                  path="/customer/requestcompensation"
                  element={<RequestCompensation />}
                />
                <Route
                  path="/customer/viewcontract"
                  element={<ViewContract />}
                />
                <Route
                  path="/customer/viewcompensation"
                  element={<ViewCompensation />}
                />
                <Route
                  path="/customer/updateprofile"
                  element={<UpdateProfile />}
                />
                <Route path="/customer/chat" element={<Chat />} />
                <Route
                  path="/customer/contract/request"
                  element={<RequestContractScreen />}
                />
              </Routes>
            </Content>
          </Layout>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Insurance Card for Motorbikes
          </Footer>
        </Layout>
      </Router>
    </ReduxProvider>
  );
}
