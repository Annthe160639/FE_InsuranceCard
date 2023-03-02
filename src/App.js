import React, { useCallback, useState, useEffect } from "react";
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
          <Headers></Headers>
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
                <Route path="/customer/mainscreen" element={<MainScreen />} />
                <Route path="/customer/createcontract" element={<CreateContract />} />
                <Route path="/customer/requestcompensation" element={<RequestCompensation />} />
                <Route path="/customer/viewcontract" element={<ViewContract />} />
                <Route path="/customer/viewcompensation" element={<ViewCompensation />} />
                <Route path="/customer/updateprofile" element={<UpdateProfile />} />
                <Route path="/customer/chat" element={<Chat />} />
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
