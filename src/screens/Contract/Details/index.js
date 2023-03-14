import { PageHeader } from "@ant-design/pro-components";
import {
  Tabs,
  Button,
  Statistic,
  Descriptions,
  Image,
  Row,
  Col,
  Tag,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneContract } from "../../../redux/features/contract";

const { TabPane } = Tabs;

const ViewContract = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [contractDetails, setContractDetails] = useState({});

  const handleGetContractDetail = useCallback(async () => {
    const { payload } = await dispatch(fetchOneContract({ id }));
    setContractDetails(payload);

  }, []);

  useEffect(() => {
    handleGetContractDetail();
  }, []);
  return (
    <PageHeader
      className="site-page-header-responsive"
      onBack={() => window.history.back()}
      title="Thông tin hợp đồng"
      extra={[
        <div
          style={{
            display: "flex",
            width: "max-content",
            justifyContent: "flex-end",
            marginRight: "10vw",
          }}
        >
          <Statistic
            title="Trạng thái"
            value={contractDetails.status?.toUpperCase()}
            style={{
              marginRight: 32,
            }}
            valueStyle={{
              color:
                contractDetails.status == "Đang xử lý"
                  ? "blue"
                  : contractDetails.status == "Đã duyệt"
                  ? "green"
                  : "orange",
            }}
          />
          <Statistic
            title="Price"
            style={{ fontWeight: 700 }}
            value={new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "VND",
            }).format(
              (new Date(contractDetails.endDate).getFullYear() -
                new Date(contractDetails.startDate).getFullYear()) *
                contractDetails.contractType?.price
            )}
          />
        </div>,
      ]}
      footer={
        <Tabs defaultActiveKey="1">
          <TabPane tab="Thông tin người mua" key="1">
            <Row>
              <Col span={8}>
                <Image src="https://mybic.vn/uploads/photos/75/xe-may.jpg" />
              </Col>
              <Col span={16} style={{ paddingLeft: 20 }}>
                <Descriptions size="small" column={1}>
                  <Descriptions.Item label="Họ và tên">
                    {contractDetails.buyer?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="CMND/CCCD">
                    {contractDetails.buyer?.ci}
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ">
                    {contractDetails.buyer?.address}
                  </Descriptions.Item>
                  <Descriptions.Item label="Số điện thoại">
                    {contractDetails.buyer?.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ghi chú">
                    {contractDetails.buyer?.note}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      }
      style={{
        backgroundColor: "white",
        margin: "16px 0",
        height: "100%",
      }}
    >
      <Content>
        <Descriptions size="middle" column={2}>
          <Descriptions.Item span={2} label="Loại bảo hiểm">
            {contractDetails.contractType?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Hạn mức bảo hiểm">
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "VND",
            }).format(contractDetails.contractType?.insuranceLevel)}
          </Descriptions.Item>
          <Descriptions.Item label="Giá">
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "VND",
            }).format(contractDetails.contractType?.price)}
          </Descriptions.Item>
          <Descriptions.Item label="Biển kiểm soát">
            {contractDetails.pattern}
          </Descriptions.Item>
          <Descriptions.Item label="Loại xe">
            {contractDetails.contractType?.vehicleType}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {contractDetails.startDate}
          </Descriptions.Item>
          <Descriptions.Item label="Thời gian hiệu lực">
            {new Date(contractDetails.endDate).getFullYear() -
              new Date(contractDetails.startDate).getFullYear()}{" "}
            năm
          </Descriptions.Item>
        </Descriptions>
      </Content>
    </PageHeader>
  );
};

export default ViewContract;
