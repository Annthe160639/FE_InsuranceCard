import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Table, Tag, Input, Button, Space } from "antd";
import { fetchAllContractHistory } from "../../../redux/features/contract";
import { SearchOutlined } from "@ant-design/icons";
import { generatePath, Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routerConst";
import { fetchAllManagerContract } from "../../../redux/features/manager";
import { fetchAllStaffContract } from "../../../redux/features/staff";

const { Title } = Typography;

export default function ListContracts() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const user = useSelector(({ user: { user } }) => user);

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
        render: (text, record) => {
          console.log(record.id);
          return (
            <Link
              to={
                user.role == "customer"
                  ? generatePath(ROUTES.CUSTOMER_CONTRACT_DETAILS, {
                      id: record.id,
                    })
                  : user.role == "staff"
                  ? generatePath(ROUTES.STAFF_CONTRACT_DETAILS, {
                      id: record.id,
                    })
                  : generatePath(ROUTES.MANAGER_CONTRACT_DETAILS, {
                      id: record.id,
                    })
              }
            >
              {text}
            </Link>
          );
        },
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
            color = "orange";
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
    [JSON.stringify(data), JSON.stringify(user)]
  );

  const fetchContractHistory = useCallback(async () => {
    if (user.role === "customer") {
      const { payload } = await dispatch(fetchAllContractHistory());
      setData(payload);
    } else if (user.role === "staff") {
      const { payload } = await dispatch(fetchAllStaffContract());
      setData(payload);
    } else if (user.role === "manager") {
      const { payload } = await dispatch(fetchAllManagerContract());
      setData(payload);
    }
  }, [JSON.stringify(user)]);

  useEffect(() => {
    fetchContractHistory();
  }, [JSON.stringify(user)]);

  return (
    <>
      <Title className="title">Danh sách hợp đồng</Title>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
