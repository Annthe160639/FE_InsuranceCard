import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Typography, Table, theme, Tag } from "antd";
import { useDispatch } from "react-redux";
import { customerViewList } from "../../../redux/features/customer";

const { Title } = Typography;

const StaffCustomer = () => {
  const [customerList, setCustomerList] = useState([]);
  const dispatch = useDispatch();
  const columns = useMemo(() => [
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Gmail",
      dataIndex: "gmail",
      key: "gmail",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "CCCD/CMTND",
      dataIndex: "ci",
      key: "ci",
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      key: "is_active",
      render: (isActive) => {
        if (isActive === true) {
          return <Tag color="green">Active</Tag>;
        } else {
          return <Tag color="red">Disabled</Tag>;
        }
      },
    },
  ]);

  const handleGetCustomerList = useCallback(() => {
    dispatch(customerViewList({})).then(({ payload }) => {
      if (Array.isArray(payload.content)) {
        payload = payload.content.map((customerView) => ({
          key: customerView.id,
          name: customerView.name,
          gmail: customerView.gmail,
          phone: customerView.phone,
          address: customerView.address,
          ci: customerView.ci,
          is_active: customerView.active,
        }));
        console.log(payload);
        setCustomerList(payload);
      } else {
        console.log(
          "Error: The response payload from CustomerViewList is not an array"
        );
      }
    });
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    handleGetCustomerList();
  }, []);

  return (
    <div>
      <Title style={{ textAlign: "center" }}>Quản lý khách hàng</Title>
      <Table columns={columns} dataSource={customerList} />
    </div>
  );
};

export default StaffCustomer;