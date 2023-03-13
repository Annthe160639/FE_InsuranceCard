import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Typography, Table, Tag, Input, Button, Space } from "antd";
import { fetchAllContractHistory } from "../../../redux/features/contract";
import { SearchOutlined } from "@ant-design/icons";
import { generatePath, Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routerConst";

const { Title } = Typography;

export default function ListContracts() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");

  const columns = useMemo(
    () => [
      {
        title: () => (
          <Space
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <span>Biển số xe</span>
            <SearchOutlined />
          </Space>
        ),
        dataIndex: "pattern",
        key: "pattern",
      },
      {
        title: "Hợp đồng",
        dataIndex: ["contractType", "name"],
        key: "contract",
        render: (text, record) => <Link to={generatePath(ROUTES.CUSTOMER_CONTRACT_DETAILS, {id: record.id})}>{text}</Link>,
      },
      {
        title: "Ngày tạo",
        dataIndex: "startDate",
        key: "startDate",
        render: (_, { startDate, endDate }) =>
          new Date(endDate).toLocaleDateString(),
      },
      {
        title: "Thời gian hiệu lực",
        dataIndex: "duration",
        key: "duration",
        render: (_, { startDate, endDate }) =>
          `${
            new Date(endDate).getFullYear() - new Date(startDate).getFullYear()
          } Năm`,
      },
      {
        title: "Phí bảo hiểm",
        dataIndex: ["contractType", "price"],
        key: "price",
        render: (_, { contractType: { price } }) => {
          price = String(price);
          const size = 3;
          const length = price.length;
          const chunks = Array(Math.ceil(length / size));
          if (length) {
            chunks[0] = price.slice(0, length % size || size);
            for (let i = 1, index = chunks[0].length; index < length; i++) {
              chunks[i] = price.slice(index, (index += size));
            }
          }
          return chunks.join(".") + "VNĐ";
        },
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (_, { status }) => {
          let color = status === "Ðang xử lý" ? "blue" : "";
          if (status === "Đã duyệt") {
            color = "green";
          } else if (status === "Đang chờ xử lý") {
            color = "yellow";
          }
          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          );
        },
        filters: [
          {
            text: "Ðang xử lý",
            value: "Ðang xử lý",
          },
          {
            text: "Đã duyệt",
            value: "Đã duyệt",
          },
          {
            text: "Đang chờ xử lý",
            value: "Đang chờ xử lý",
          },
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0,
      },
    ],
    []
  );

  const fetchContractHistory = useCallback(async () => {
    const { payload } = await dispatch(fetchAllContractHistory());
    setData(payload);
  });

  useEffect(() => {
    fetchContractHistory();
  }, []);
  return (
    <div>
      <Title className="title">Danh sách hợp đồng</Title>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
