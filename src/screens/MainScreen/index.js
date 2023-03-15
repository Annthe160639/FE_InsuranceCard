import React from "react";
import Banner from "../../components/Banner";
import { Link } from "react-router-dom";
import { Space, Button } from "antd";
import "./MainScreen.css";
import { ROUTES } from "../../constants/routerConst";

const MainScreen = () => {
  return (
    <div>
      <Banner />
      <div className="space-block">
        <Space wrap align="center" size={100}>
          <Button className="mock-block" type="default">
            <Link to={ROUTES.HOME_ROUTER}>Tạo hợp đồng</Link>
          </Button>
          <Button className="mock-block" type="default">
            <Link to="/customer/requestcompensation">Yêu cầu đền bù</Link>
          </Button>
          <Button className="mock-block" type="default">
            <Link to="/customer/viewcontract">Xem hợp đồng</Link>
          </Button>
          <Button className="mock-block" type="default">
            <Link to="/customer/viewcompensation">Xem yêu cầu đền bù</Link>
          </Button>
          <Button className="mock-block" type="default">
            <Link to="/customer/chat">Chăm sóc khách hàng</Link>
          </Button>
          <Button className="mock-block" type="default">
            <Link to="/customer/updateprofile">Thông tin cá nhân</Link>
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default MainScreen;
