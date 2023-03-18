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
  Spin,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, Link, useParams } from "react-router-dom";
import { ROUTES } from "../../../constants/routerConst";
import { fetchOneCompensation } from "../../../redux/features/compensation";
import {
  managerCompensationApprove,
  managerCompensationReject,
} from "../../../redux/features/manager";
import { createNotification } from "../../../redux/features/notification";
import {
  staffCompensationApprove,
  staffCompensationReject,
} from "../../../redux/features/staff";

const { TabPane } = Tabs;

export default function ViewCompensation() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(({ user: { user } }) => user);
  const [compensationDetails, setCompensationDetails] = useState({});

  const handleGetCompensationDetail = useCallback(async () => {
    const { payload } = await dispatch(
      fetchOneCompensation({ role: user.role, id })
    );
    setCompensationDetails(payload);
  }, [JSON.stringify(user), id]);

  const handleApproveCompensation = useCallback(async () => {
    let res = { error: {}, payload: {} };
    if (user.role == "staff") {
      res = await dispatch(staffCompensationApprove({ id }));
    } else if (user.role == "manager") {
      res = await dispatch(managerCompensationApprove({ id }));
    }

    await dispatch(
      createNotification({
        type: res.error ? "error" : "success",
        message: res.error ? res.payload : "Duyệt đơn thành công",
      })
    );

    if (!res.error) {
      handleGetCompensationDetail();
    }
  }, [JSON.stringify(user)]);

  const handleRejectCompensation = useCallback(async () => {
    let res = { error: {}, payload: {} };
    if (user.role == "staff") {
      res = await dispatch(staffCompensationReject({ id }));
    } else if (user.role == "manager") {
      res = await dispatch(managerCompensationReject({ id }));
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
      handleGetCompensationDetail();
    }
  }, []);

  useEffect(() => {
    handleGetCompensationDetail();
  }, []);

  return (
    <Spin spinning={!compensationDetails}>
      <PageHeader
        className="site-page-header-responsive"
        onBack={() => window.history.back()}
        title="Thông tin đền bù"
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
                {(compensationDetails?.status == "Đang chờ xử lý" ||
                  compensationDetails?.status == "Đang xử lý") && (
                  <Button danger onClick={handleRejectCompensation}>
                    Từ chối
                  </Button>
                )}
                {(compensationDetails?.status === "Đang chờ xử lý" ||
                  (compensationDetails?.status === "Đang xử lý" &&
                    user.role == "manager")) && (
                  <Button type="primary" onClick={handleApproveCompensation}>
                    {user.role === "staff" &&
                    compensationDetails?.status === "Đang chờ xử lý"
                      ? "Duyệt"
                      : ""}
                    {user.role === "manager" &&
                    (compensationDetails?.status === "Đang chờ xử lý" ||
                      compensationDetails?.status === "Đang xử lý")
                      ? "Duyệt"
                      : ""}
                  </Button>
                )}
              </Space>
            )}
            <Statistic
              title="Trạng thái"
              value={compensationDetails?.status?.toUpperCase()}
              style={{
                marginRight: 32,
              }}
              valueStyle={{
                color:
                  compensationDetails?.status == "Đang xử lý"
                    ? "blue"
                    : compensationDetails?.status == "Ðã duyệt"
                    ? "green"
                    : compensationDetails?.status == "Đã từ chối"
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
              }).format(compensationDetails?.payment)}
            />
          </div>,
        ]}
        footer={
          <Tabs defaultActiveKey="1">
            <TabPane tab="Hình ảnh tai nạn" key="1">
              <Row>
                <Col span={8}>
                  <Image src={compensationDetails?.images} />
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
            <Descriptions.Item span={2} label="Hợp đồng">
              {compensationDetails?.contractId && (
                <Link
                  to={generatePath(
                    user.role === "customer"
                      ? ROUTES.CUSTOMER_CONTRACT_DETAILS
                      : user.role === "staff"
                      ? ROUTES.STAFF_CONTRACT_DETAILS
                      : ROUTES.MANAGER_CONTRACT_DETAILS,
                    {
                      id: compensationDetails?.contractId,
                    }
                  )}
                >
                  {compensationDetails?.contract?.contractType?.name}
                </Link>
              )}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="Địa điểm tai nạn">
              {compensationDetails?.accidentAddress}
            </Descriptions.Item>
            <Descriptions.Item span={2} label="Thời điểm xảy ra">
              {compensationDetails?.accidentTime}
            </Descriptions.Item>
          </Descriptions>
        </Content>
      </PageHeader>
    </Spin>
  );
}
