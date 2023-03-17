import React from "react";
import Banner from "../../../components/Banner";
import { Space, Button } from "antd";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routerConst";
import "./StaffScreen.css";

const StaffScreen = () => {
  return (
    <div>
      <Banner />
      <div className="space-align">
        <Space wrap align="center" size={300}>
          <Button className="mock-block" type="default">
            <Link to={ROUTES.STAFF_CONTRACT_ROUTER}>Quản lý hợp đồng</Link>
          </Button>
          <Button className="mock-block" type="default">
            <Link to={ROUTES.STAFF_COMPENSATION_ROUTER}>Quản lý đền bù</Link>
          </Button>
          <Button className="mock-block" type="default">
            <Link to={ROUTES.STAFF_CUSTOMER_ROUTER}>Quản lý khách hàng</Link>
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default StaffScreen;
