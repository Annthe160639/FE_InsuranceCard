import React, { useCallback, useEffect, useState } from "react";
import "./ViewContract.css";
import { Typography, Table, Tag } from "antd";
import { useDispatch } from "react-redux";
import { fetchAllContractHistory } from "../../redux/features/contract";

const { Title } = Typography;

const columns = [
  {
    title: "Biển số xe",
    dataIndex: "pattern",
    key: "pattern",
  },
  {
    title: "Hợp đồng",
    dataIndex: ["contractType", "name"],
    key: "contract",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Thời gian hiệu lực",
    dataIndex: "startDate",
    key: "startDate",
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
      let color = status === "Đang xử lý" ? "yellow" : "";
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
  },
];

const data = [
  {
    carNumber: "14B1-68208",
    contract: "GiangPT-50cc",
    time: "1 năm",
    fee: "86.000 VND",
    status: ["Đã duyệt"],
  },
];

export default function ListContracts() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const fetchContractHistory = useCallback(async () => {
    const { payload } = await dispatch(fetchAllContractHistory());
    console.log(payload);
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
