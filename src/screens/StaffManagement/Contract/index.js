import React, { useState } from "react";
import { Typography, Table, Tag, Button, Space } from "antd";
import Column from "antd/es/table/Column";

const { Title } = Typography;
const data = [
  {
    key: "1",
    start_date: "2019-01-01 00:00:00.000",
    contract: "Hợp đồng xe 50cc",
    username: "GiangPT",
  },
  {
    key: "2",
    start_date: "2022-01-05 00:00:00.000",
    contract: "Hợp đồng xe 150cc",
    username: "AnNT",
  },
];

const StaffContract = () => {
  const [ status, setStatus ] = useState(false);
  const changeStatus = () => {
    setStatus(!status);
  }
  return (
    <div>
      <Title className="title">Danh sách hợp đồng</Title>
      <Table dataSource={data}>
        <Column
          title="Thời gian đăng ký"
          dataIndex="start_date"
          key="start_date"
        ></Column>
        <Column
          title="Hợp đồng"
          dataIndex="contract"
          key="contract"
          render={(text) => <a>{text}</a>}
        ></Column>
        <Column
          title="Tên khách hàng"
          dataIndex="username"
          key="username"
        ></Column>
        <Column
          title="Actions"
          key="action"
          render={() => (
            <Space wrap>
              <Button type="primary" onClick={changeStatus} style={{backgroundColor: status ? "black": "white"}}>Chấp thuận</Button>
              <Button type="primary" onClick={changeStatus} danger>
                Từ chối
              </Button>
            </Space>
          )}
        ></Column>
      </Table>
    </div>
  );
};

export default StaffContract;
