import { Layout, Menu } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routerConst";
import { getUser } from "../redux/features/user";
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
              <Menu.Item key={"contract"}>
                {user.role == "customer" && (
                  <Link to={ROUTES.CUSTOMER_CONTRACT_HISTORY}>Hợp đồng</Link>
                )}
                {user.role == "staff" && (
                  <Link to={ROUTES.STAFF_CONTRACT}>Hợp đồng</Link>
                )}
                {user.role == "manager" && (
                  <Link to={ROUTES.MANAGER_CONTRACT}>Hợp đồng</Link>
                )}
              </Menu.Item>
              <Menu.Item key={"compensation"}>
                {user.role == "customer" && (
                  <Link to={ROUTES.CUSTOMER_COMPENSATION_LIST}>Hợp đồng đền bù</Link>
                )}
                {user.role == "staff" && (
                  <Link to={ROUTES.STAFF_COMPENSATION}>Hợp đồng đền bù</Link>
                )}
                {user.role == "manager" && (
                  <Link to={ROUTES.MANAGER_COMPENSATION}>Hợp đồng đền bù</Link>
                )}
              </Menu.Item>
              {user.role == "manager" && (
                <>
                  <Menu.Item key={"contract-type"}>
                    <Link to={ROUTES.MANAGER_CONTRACTYPE}>
                      Loại hợp đồng
                    </Link>
                  </Menu.Item>
                  <Menu.Item key={"employee-manager"}>
                    <Link to={ROUTES.MANAGER_EMPLOYEE}>
                      Quản lý nhân viên
                    </Link>
                  </Menu.Item>
                  <Menu.Item key={"customer-manager"}>
                    <Link to={ROUTES.MANAGER_CUSTOMER}>
                      Quản lý khách hàng
                    </Link>
                  </Menu.Item>
                </>
              )}
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
