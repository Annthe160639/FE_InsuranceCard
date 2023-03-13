import { Layout, Menu } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { isEmpty } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routerConst";
import { getUserSession } from "../redux/features/customer";
import PageHeader from "./Header";

export default function CommonLayout() {
  const dispatch = useDispatch();
  const customer = useSelector(({ customer: { customer } }) => customer);

  const handleGetUser = useCallback(async () => {
    if (isEmpty(customer)) {
      await dispatch(getUserSession());
    }
  }, [JSON.stringify(customer)]);

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <PageHeader />
      <Layout className="site-layout">
        {!isEmpty(customer) && (
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
              <Menu.Item key={"staffscreen"}>
                <Link to={ROUTES.STAFF_MAINSCREEN_ROUTER}>Quản lí</Link>
              </Menu.Item>
              <Menu.Item key={"managerscreen"}>
                <Link to={ROUTES.MANAGER_SCREEN_ROUTER}>Nhân viên</Link>
              </Menu.Item>
            </Menu>
          </Sider>
        )}
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Outlet />
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
  );
}
