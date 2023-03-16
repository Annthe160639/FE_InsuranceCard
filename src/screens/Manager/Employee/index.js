import { Button, Space, Table } from "antd";
import { SearchOutlined, UserSwitchOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeRoleEmployee,
  fetchAllManager,
  fetchAllStaff,
} from "../../../redux/features/manager";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routerConst";
import { createNotification } from "../../../redux/features/notification";
import { orderBy, pick, sortBy, uniqBy } from "lodash";

export default function ListEmployees() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const handleChangeRole = useCallback(async ({ role, id }) => {
    let { error } = await dispatch(changeRoleEmployee({ role, id }));

    await dispatch(
      createNotification({
        type: error ? "error" : "success",
        message: error
          ? "Không đổi được chức vị"
          : "Cập nhật chức vị thành công",
      })
    );

    if (!error) {
      handleFetchAllEmployy();
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        width: "3%",
        render: (_, record, index) => index + 1,
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
        width: "20%",
      },
      {
        title: "Chức vị",
        dataIndex: "role",
        key: "role",
        width: "10%",
        render: (_, { role, id }) => {
          return (
            <Space>
              <>{role == "staff" ? "Nhân viên" : "Quản lý"}</>
              <Button
                icon={<UserSwitchOutlined />}
                onClick={() => handleChangeRole({ role, id })}
              ></Button>
            </Space>
          );
        },
        filters: [
          {
            text: "Nhân viên",
            value: "staff",
          },
          {
            text: "Quản lý",
            value: "manager",
          },
        ],
        onFilter: (value, record) => record.role.indexOf(value) === 0,
      },
    ],
    []
  );

  const handleFetchAllEmployy = useCallback(async () => {
    const { payload: staffs } = await dispatch(fetchAllStaff());
    const { payload: managers } = await dispatch(fetchAllManager());
    setData(
      orderBy(
        uniqBy(
          orderBy(
            uniqBy([...staffs, ...managers], (e) =>
              JSON.stringify(pick(e, ["username", "role"]))
            ),
            ["username", "role"],
            "desc"
          ),
          "username"
        ),
        ["role"],
        "desc"
      )
    );
  }, []);

  useEffect(() => {
    handleFetchAllEmployy();
  }, []);

  return (
    <>
      <Title className="title">Danh sách khách hàng</Title>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
