import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Layout, Menu, Space, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { IdcardOutlined } from "@ant-design/icons";
import Banner from "../../components/Banner";
import {
  contractTypeDetailsById,
  contractTypeList,
} from "../../redux/features/contract";
import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contractTypes, setContractTypes] = useState([]);
  const [contractTypeDetails, setContractTypeDetails] = useState(null);

  const handleSelectedContract = useCallback(({ key }) => {
    dispatch(contractTypeDetailsById(key)).then(({ payload }) => {
      if (payload) {
        setContractTypeDetails(payload);
      }
    });
  }, []);

  const handleGetContractType = useCallback(() => {
    dispatch(contractTypeList({})).then(({ payload }) => {
      payload = payload.map((contractType) => ({
        key: contractType.id,
        icon: React.createElement(IdcardOutlined),
        label: contractType.name,
      }));
      setContractTypes(payload);
      handleSelectedContract({ key: payload[0].key });
    });
  }, []);

  useEffect(() => {
    handleGetContractType();
  }, []);

  return (
    <>
      <div>
        <Banner />
      </div>
      <Layout
        style={{
          padding: "24px 0",
        }}
      >
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            selectable
            style={{
              height: "100%",
            }}
            onSelect={handleSelectedContract}
            items={contractTypes}
          />
        </Sider>
        {contractTypeDetails && (
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            <Layout style={{ height: "100%" }}>
              <Sider style={{ height: "100%" }}></Sider>
              <Layout>
                <Header>
                  <h2 style={{ textAlign: "center" }}>
                    {contractTypeDetails.name}
                  </h2>
                </Header>
                <Content
                  style={{
                    paddingTop: "20px",
                    paddingLeft: "30px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Space
                    direction="vertical"
                    style={{
                      display: "flex",
                    }}
                  >
                    <div>Phân khúc: {contractTypeDetails.vehicleType}</div>
                    <div>Giá bán: {contractTypeDetails.price}</div>
                  </Space>
                  <Space
                    direction="horizontal"
                    style={{
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <Button type="default">Chi tiết</Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        navigate(`/customer/contract/request`, {
                          state: { contractTypeDetails },
                        });
                      }}
                    >
                      Mua ngay
                    </Button>
                  </Space>
                </Content>
              </Layout>
            </Layout>
          </Content>
        )}
      </Layout>
    </>
  );
}
