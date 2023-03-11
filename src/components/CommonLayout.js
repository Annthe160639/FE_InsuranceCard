import { Layout, Menu } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routerConst";
import PageHeader from "./Header";

export default function CommonLayout() {
  const navigate = useNavigate();
  const customer = useSelector(({ customer: { customer } }) => customer);

  useEffect(() => {
    if (!customer.username) {
      navigate(ROUTES.HOME_ROUTER, { replace: true });
    }
  }, [JSON.stringify(customer)]);

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
