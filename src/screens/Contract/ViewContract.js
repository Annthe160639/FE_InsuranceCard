import React from "react";
import "./ViewContract.css";
import { Typography, Table, Tag } from "antd";

const { Title } = Typography;

const columns = [
  {
    title: "Biển số xe",
    dataIndex: "carNumber",
    key: "carNumber",
  },
  {
    title: "Hợp đồng",
    dataIndex: "contract",
    key: "contract",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Thời gian hiệu lực",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Phí bảo hiểm",
    dataIndex: "fee",
    key: "fee",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (_, { status }) => (
      <>
        {status.map((tag) => {
          let color = tag.length > 5 ? "Đang xử lý" : "yellow";
          if (tag === "Đã duyệt") {
            color = "green";
          } else if (tag === "Đang chờ xử lý") {
            color = "yellow";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
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


const ViewContract = () => {
  return (
    <div>
      <Title className="title">Danh sách hợp đồng</Title>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ViewContract;
