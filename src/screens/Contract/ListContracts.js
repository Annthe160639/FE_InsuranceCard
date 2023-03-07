import React, { useCallback, useEffect, useState } from "react";
import "./ViewContract.css";
import { Typography, Table, Tag } from "antd";
import { useDispatch } from "react-redux";
import { fetchAllContractHistory } from "../../redux/features/contract";

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

export default function ListContracts() {
  const dispatch = useDispatch();
  // const [data, setData] = useState([])
  // const fetchContractHistory = useCallback(async () => {
  //   setData(await dispatch(fetchAllContractHistory()));
  // });

  // useEffect(() => {
  //   fetchContractHistory()
  // }, [])
  return (
    <div>
      <Title className="title">Danh sách hợp đồng</Title>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
