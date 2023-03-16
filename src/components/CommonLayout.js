import { Layout, Menu } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { isEmpty } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routerConst";
import { getUserSession } from "../redux/features/customer";
import { getManagerUserSession } from "../redux/features/manager";
import { getUser, setUser } from "../redux/features/user";
import PageHeader from "./Header";

export default function CommonLayout() {
  const dispatch = useDispatch();
  const user = useSelector(({ user: { user } }) => user);

  useEffect(() => {
    dispatch(getUser());
  }, [JSON.stringify(user)]);

  return (
    <Layout
      style={{
        minHeight: "98vh",
      }}
    >
      <PageHeader />
      <Layout className="site-layout">
        {!isEmpty(user) && (
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
              {user.role == "customer" && (
                <Menu.Item key={"contract"}>
                  <Link to={ROUTES.CUSTOMER_CONTRACT_HISTORY}>Hợp đồng</Link>
                </Menu.Item>
              )}
              {user.role == "manager" && (
                <>
                  <Menu.Item key={"contract"}>
                    <Link to={ROUTES.MANAGER_CONTRACT_ROUTER}>Hợp đồng</Link>
                  </Menu.Item>
                  <Menu.Item key={"contract-type"}>
                    <Link to={ROUTES.MANAGER_CONTRACTYPE_ROUTER}>
                      Loại hợp đồng
                    </Link>
                  </Menu.Item>
                  <Menu.Item key={"employee-manager"}>
                    <Link to={ROUTES.MANAGER_EMPLOYEE_ROUTER}>
                      Quản lý nhân viên
                    </Link>
                  </Menu.Item>
                  <Menu.Item key={"customer-manager"}>
                    <Link to={ROUTES.MANAGER_CUSTOMER_ROUTER}>
                      Quản lý khách hàng
                    </Link>
                  </Menu.Item>
                </>
              )}

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
