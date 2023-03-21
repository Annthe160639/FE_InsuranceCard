import { Button, Form, Input, Modal, Popconfirm, Space, Table } from "antd";
import {
  DeleteOutlined,
  PlusOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addNewStaff,
  changeRoleEmployee,
  deleteManager,
  deleteStaff,
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
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [isOpen, setOpen] = useState(false);
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

  const handleDeleteEmployee = useCallback(async ({ role, id }) => {
    let res = { error: null, payload: null };
    if (role == "staff") {
      res = await dispatch(deleteStaff({ id }));
    } else {
      res = await dispatch(deleteManager({ id }));
    }

    await dispatch(
      createNotification({
        type: res.error ? "error" : "success",
        message: res.error
          ? "Có lỗi xảy ra trong khi xoá nhân viên!"
          : "Xoá thành công",
      })
    );

    if (!res.error) {
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
        title: "Tên người dùng",
        dataIndex: "username",
        key: "username",
        width: "57%",
      },
      {
        title: "Chức vị",
        dataIndex: "role",
        key: "role",
        width: "30%",
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
        render: (_, { role, id }) => {
          return <>{role == "staff" ? "Nhân viên" : "Quản lý"}</>;
        },
        onFilter: (value, record) => record.role.indexOf(value) === 0,
      },
      {
        width: 40,
        render: (_, { role, id }) => {
          return (
            <Space>
              <Popconfirm
                title="Cập nhật chức vị"
                description={
                  <>
                    Bạn có muốn{" "}
                    {role == "staff" ? (
                      <>
                        cập nhật chức chức vị <strong>Quản lý</strong>
                      </>
                    ) : (
                      <>
                        giáng chức chức vị xuống <strong>Nhân viên</strong>
                      </>
                    )}{" "}
                    của nhân viên này không?
                  </>
                }
                onConfirm={() => {
                  handleChangeRole({ role, id });
                }}
                okText="Đồng ý"
                cancelText="Từ chối"
              >
                <Button icon={<UserSwitchOutlined />}></Button>
              </Popconfirm>
              <Popconfirm
                title="Cập nhật chức vị"
                description={"Bạn có muốn xoá nhân viên này không?"}
                onConfirm={() => {
                  handleDeleteEmployee({ role, id });
                }}
                okText="Đồng ý"
                cancelText="Từ chối"
              >
                <Button icon={<DeleteOutlined />} danger></Button>
              </Popconfirm>
            </Space>
          );
        },
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

  const handleAddNewEmployee = useCallback(async ({ username, password }) => {
    const { error } = await dispatch(addNewStaff({ username, password }));

    await dispatch(
      createNotification({
        type: error ? "error" : "success",
        message: error ? error : "Thêm nhân viên mới thành công!",
      })
    );

    if (!error) {
      handleFetchAllEmployy();
      setOpen(false);
    }
  });

  useEffect(() => {
    handleFetchAllEmployy();
  }, []);

  return (
    <div style={{ margin: "16px 0" }}>
      <Modal
        maskClosable={false}
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={() => setOpen(false)}
      >
        <Form form={form} onFinish={handleAddNewEmployee}>
          <Form.Item label="Tên người dùng" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password">
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => setOpen(true)}
        >
          Thêm nhân viên mới
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
