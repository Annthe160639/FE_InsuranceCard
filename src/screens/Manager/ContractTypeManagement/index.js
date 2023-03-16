import { Button, Descriptions, Table, Tag } from "antd";
import { FormOutlined, PlusOutlined } from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { generatePath, Link, Routes, useNavigate } from "react-router-dom";
import { fetchAllContractType } from "../../../redux/features/contract";
import Title from "antd/es/typography/Title";
import { ROUTES } from "../../../constants/routerConst";

export default function ContractTypeManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        title: "Loại hợp đồng",
        dataIndex: "name",
        key: "name",
        width: "20%",
      },

      {
        title: "Loại xe",
        dataIndex: "vehicleType",
        key: "vehicleType",
        width: "20%",
      },
      {
        title: "Phí bảo hiểm",
        dataIndex: "price",
        key: "price",
        width: "10%",
        render: (_, { price }) =>
          `${new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "VND",
          }).format(price)}`,
      },
      {
        title: "Mức độ bồi thường",
        dataIndex: "insuranceLevel",
        key: "insuranceLevel",
        width: "12%",
        render: (_, { insuranceLevel }) =>
          `${new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "VND",
          }).format(insuranceLevel)}`,
      },
      {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
        render: (_, { description }) => (
          <Paragraph
            style={{ margin: "auto" }}
            ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
          >
            {description}
          </Paragraph>
        ),
        width: "29%",
      },
      {
        title: "",
        render: (_, { id }) => (
          <Button
            icon={<FormOutlined />}
            onClick={() =>
              navigate(
                generatePath(ROUTES.MANAGER_CONTRACTYPE_DETAILS, {
                  id,
                })
              )
            }
          ></Button>
        ),
        width: "10%",
      },
    ],
    []
  );

  const fetchContractHistory = useCallback(async () => {
    const { payload } = await dispatch(fetchAllContractType());
    setData(payload);
  });

  useEffect(() => {
    fetchContractHistory();
  }, []);
  return (
    <>
      <Title level={3}>Danh sách hợp đồng</Title>
      <Descriptions
        extra={
          <Link to={ROUTES.MANAGER_INSERT_CONTRACTYPE}>
            <Button type="primary" icon={<PlusOutlined />}>
              Thêm
            </Button>
          </Link>
        }
      >
        <Descriptions.Item span={1}>
          <Table
            columns={columns}
            dataSource={data}
            style={{ width: "100%" }}
          />
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}
