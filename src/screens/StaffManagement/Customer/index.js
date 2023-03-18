import { Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAllCustomers } from "../../../redux/features/manager";

export default function ListCustomers() {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const columns = useMemo(
    () => [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        width: "3%",
      },
      {
        title: () => (
          <Space
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <span>Tên người dùng</span>
            <SearchOutlined />
          </Space>
        ),
        dataIndex: "username",
        key: "username",
      },
      {
        title: "Họ tên",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Điện thoại",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Địa chỉ",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "CMND/CCCD",
        dataIndex: "ci",
        key: "ci",
      },
    ],
    []
  );

  const handleFetchAllCustomer = useCallback(async () => {
    const { payload } = await dispatch(fetchAllCustomers());
  }, []);

  useEffect(() => {
    handleFetchAllCustomer();
  }, []);

  return (
    <>
      <Title className="title">Danh sách khách hàng</Title>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
