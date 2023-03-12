import React, { useState } from "react";
import { Typography, Table, Tag, Button, Space } from "antd";
import Column from "antd/es/table/Column";

const { Title } = Typography;
const data = [
  {
    key: "1",
    username: "GiangPT",
    name:"Phan Truong Giang",
    gmail:"giangbeo@gmail.com",
    phone:"0867543272",
    address: "Hạ Long, Quảng Ninh",
    ci:"0304050000103",
    buy:"Hợp đồng cho xe trên 50cc",
  },
  {
    key: "2",
    username: "AnNT",
    name:"Nguyen Thi An",
    gmail:"ancochap@gmail.com",
    phone:"0898987265",
    address: "Quốc Oai, Hà Nội",
    ci:"0304050000123",
    buy:"Hợp đồng cho xe 150cc",
  },
];


const StaffCustomer = () => {
  return (
    <div>
      <Title className="title" >Danh sách khách hàng</Title>
      <Table dataSource={data} >
        <Column
          title="Tên tài khoản"
          dataIndex="username"
          key="username"
          align="center"
        ></Column>
        <Column
          title="Tên khách hàng"
          dataIndex="name"
          key="name"
          align="center"
        ></Column>
        <Column
          title="Gmail"
          dataIndex="gmail"
          key="gmail"
          align="center"
        ></Column>
        <Column
          title="Số điện thoại"
          dataIndex="phone"
          key="phone"
          align="center"
        ></Column>
        <Column
          title="Địa chỉ"
          dataIndex="address"
          key="address"
          align="center"
        ></Column>
        <Column
          title="Hợp đồng đã ký"
          dataIndex="buy"
          key="buy"
          align="center"
        ></Column>
      </Table>
    </div>
  );
};
export default StaffCustomer;
