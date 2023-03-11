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

const StatusChange = ({ rowKey, onClickApprove, onClickReject }) => {
  const [buttonStatus, setButtonStatus] = useState(true);
  const [status, setStatus] = useState(null);

  const handleApprove = () => {
    setButtonStatus(false);
    setStatus("approved");
    onClickApprove(rowKey);
  };

  const handleDeny = () => {
    setButtonStatus(false);
    setStatus("denied");
    onClickReject(rowKey);
  };

  return (
    <Space wrap>
      {buttonStatus ? (
        <>
          <Button type="primary" onClick={handleApprove}>
            Chấp Thuận
          </Button>
          <Button type="primary" danger onClick={handleDeny}>
            Từ Chối
          </Button>
        </>
      ) : (
        <>
          {status === "approved" && <Tag color="success">Đã duyệt</Tag>}
          {status === "denied" && <Tag color="error">Từ chối</Tag>}
        </>
      )}
    </Space>
  );
};

const StaffContract = () => {
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
          title="Trạng thái"
          key="status"
          render={(record) => (
            <StatusChange
              rowKey={record.key}
              value={"Đang chờ duyệt"}
              onClickApprove={(key) =>
                console.log(`Approving row with key ${key}`)
              }
              onClickReject={(key) =>
                console.log(`Rejecting row with key ${key}`)
              }
            />
          )}
        ></Column>
      </Table>
    </div>
  );
};

export default StaffContract;
