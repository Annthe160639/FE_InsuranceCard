import { PageHeader } from "@ant-design/pro-components";
import {
  Tabs,
  Statistic,
  Descriptions,
  Image,
  Row,
  Col,
  Button,
  Space,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOneContract } from "../../../redux/features/contract";
import {
  managerContractApprove,
  managerContractReject,
} from "../../../redux/features/manager";
import { createNotification } from "../../../redux/features/notification";
import {
  staffContractApprove,
  staffContractReject,
} from "../../../redux/features/staff";

const { TabPane } = Tabs;

export default function ViewContract() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(({ user: { user } }) => user);
  const [contractDetails, setContractDetails] = useState({});

  const handleGetContractDetail = useCallback(async () => {
    const { payload } = await dispatch(
      fetchOneContract({ role: user.role, id })
    );
    setContractDetails(payload);
  }, [JSON.stringify(user), id]);

  const handleApproveContract = useCallback(async () => {
    let res = { error: {}, payload: {} };
    if (user.role == "staff") {
      res = await dispatch(staffContractApprove({ id }));
    } else if (user.role == "manager") {
      res = await dispatch(managerContractApprove({ id }));
    }

    await dispatch(
      createNotification({
        type: res.error ? "error" : "success",
        message: res.error ? res.payload : "Duyệt đơn thành công",
      })
    );

    if (!res.error) {
      handleGetContractDetail();
    }
  }, [JSON.stringify(user)]);

  const handleRejectContract = useCallback(async () => {
    let res = { error: {}, payload: {} };
    if (user.role == "staff") {
      res = await dispatch(staffContractReject({ id }));
    } else if (user.role == "manager") {
      res = await dispatch(managerContractReject({ id }));
    }

    await dispatch(
      createNotification({
        type: res.error ? "error" : "success",
        message: res.error
          ? "Huỷ hợp đồng không thành công"
          : "Huỷ đơn thành công",
      })
    );

    if (!res.error) {
      handleGetContractDetail();
    }
  }, [JSON.stringify(user)]);

  useEffect(() => {
    handleGetContractDetail();
  }, [JSON.stringify(user), id]);
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
            gap: "20px",
          }}
        >
          {(user.role == "staff" || user.role == "manager") && (
            <Space>
              {(contractDetails?.status == "Đang chờ xử lý" ||
                contractDetails?.status == "Đang xử lý") && (
                <Button danger onClick={handleRejectContract}>
                  Từ chối
                </Button>
              )}
              {(contractDetails?.status == "Đang chờ xử lý" ||
                contractDetails?.status == "Đang xử lý") && (
                <Button type="primary" onClick={handleApproveContract}>
                  {user.role === "staff" &&
                  contractDetails?.status == "Đang chờ xử lý"
                    ? "Duyệt"
                    : ""}
                  {!(
                    user.role === "manager" &&
                    (contractDetails?.status == "Đang chờ xử lý" ||
                      contractDetails?.status == "Đang xử lý")
                  )
                    ? "Duyệt"
                    : ""}
                </Button>
              )}
            </Space>
          )}
          <Statistic
            title="Trạng thái"
            value={contractDetails?.status?.toUpperCase()}
            style={{
              marginRight: 32,
            }}
            valueStyle={{
              color:
                contractDetails?.status == "Đang xử lý"
                  ? "blue"
                  : contractDetails?.status == "Ðã duyệt"
                  ? "green"
                  : contractDetails?.status == "Đã từ chối"
                  ? "red"
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
              (new Date(contractDetails?.endDate).getFullYear() -
                new Date(contractDetails?.startDate).getFullYear() ==
                0
                ? 1
                : (new Date(contractDetails?.endDate).getFullYear() -
                    new Date(contractDetails?.startDate).getFullYear())) *
                    contractDetails?.contractType?.price
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
                    {contractDetails?.buyer?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="CMND/CCCD">
                    {contractDetails?.buyer?.ci}
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ">
                    {contractDetails?.buyer?.address}
                  </Descriptions.Item>
                  <Descriptions.Item label="Số điện thoại">
                    {contractDetails?.buyer?.phone}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ghi chú">
                    {contractDetails?.buyer?.note}
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
            {contractDetails?.contractType?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Hạn mức bảo hiểm">
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "VND",
            }).format(contractDetails?.contractType?.insuranceLevel)}
          </Descriptions.Item>
          <Descriptions.Item label="Giá">
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "VND",
            }).format(contractDetails?.contractType?.price)}
          </Descriptions.Item>
          <Descriptions.Item label="Biển kiểm soát">
            {contractDetails?.pattern}
          </Descriptions.Item>
          <Descriptions.Item label="Loại xe">
            {contractDetails?.contractType?.vehicleType}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {contractDetails?.startDate}
          </Descriptions.Item>
          <Descriptions.Item label="Thời gian hiệu lực">
            {(new Date(contractDetails?.endDate).getFullYear() -
              new Date(contractDetails?.startDate).getFullYear()) == 0 ? 1 : new Date(contractDetails?.endDate).getFullYear() -
              new Date(contractDetails?.startDate).getFullYear()}{" "}
            năm
          </Descriptions.Item>
        </Descriptions>
      </Content>
    </PageHeader>
  );
}
