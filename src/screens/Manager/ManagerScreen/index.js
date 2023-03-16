import React from "react";
import Banner from "../../../components/Banner";
import "./ManagerScreen.css";
import { Space, Button } from "antd";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routerConst";

const ManagerScreen = () => {
  return (
    <div>
      <Banner />
      <div className="space-align-block">
        <Space wrap align="center" size={150}>
          <Button className="mock-block" type="default">
            
          </Button>
          <Button className="mock-block" type="default">
            <Link to={ROUTES.MANAGER_CONTRACTYPE}>Các loại hợp đồng</Link>
          </Button>
          <Button className="mock-block" type="default">
            <Link to={ROUTES.MANAGER_COMPENSATION}>Quản lý đền bù</Link>
          </Button>
          <Button className="mock-block" type="default">
            <Link to={ROUTES.MANAGER_ACCOUNT}>Quản lý tài khoản</Link>
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ManagerScreen;
