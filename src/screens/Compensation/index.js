import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Table } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import Title from "antd/es/skeleton/Title";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomerCompensation } from "../../redux/features/compensation";
import { createNotification } from "../../redux/features/notification";
import { generatePath, Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routerConst";
import {
  fetchAllStaffCompensation,
  fetchAllStaffCompensationList,
} from "../../redux/features/staff";
import { fetchAllManagerCompensation } from "../../redux/features/manager";
import { concat } from "lodash";

export default function ListCompensions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(({ user: { user } }) => user);
  const [compensations, setCompansations] = useState([]);

  const handleFetchAllCompensation = useCallback(async () => {
    let res = { payload: [], error: null };
    if (user.role === "customer") {
      res = await dispatch(fetchAllCustomerCompensation());
    } else if (user.role === "staff") {
      const { payload: list1 } = await dispatch(fetchAllStaffCompensation());
      const { payload: list2 } = await dispatch(
        fetchAllStaffCompensationList()
      );

      res.payload = concat(list1, list2);
    } else if (user.role === "manager") {
      res = await dispatch(fetchAllManagerCompensation());
    }

    await dispatch(
      createNotification({
        type: res.error ? "error" : "success",
        message: res.error ? "Có lỗi xảy ra khi lấy các hợp đồng đền bù" : "",
      })
    );
    console.log(res.payload);
    if (res.payload) {
      setCompansations(res.payload);
    }
  }, [JSON.stringify(user)]);

  useEffect(() => {
    handleFetchAllCompensation();
  }, []);

  const columns = useMemo(
    () => [
      {
        title: "Hợp đồng",
        dataIndex: ["contract", "contractType", "name"],
        key: "contract",
        render: (_, { contract, contractId }) => {
          return (
            <Link
              to={generatePath(
                user.role === "customer"
                  ? ROUTES.CUSTOMER_CONTRACT_DETAILS
                  : user.role === "staff"
                  ? ROUTES.STAFF_CONTRACT_DETAILS
                  : ROUTES.MANAGER_CONTRACT_DETAILS,
                { id: contractId }
              )}
            >
              {contract?.contractType?.name}
            </Link>
          );
        },
      },
      {
        title: "Địa điểm xảy ra tại nạn",
        dataIndex: ["accidentAddress"],
        key: "accidentAddress",
      },
      {
        title: "Thời gian xảy ra tại nạn",
        dataIndex: ["accidentTime"],
        key: "accidentTime",
      },
      {
        title: "Phí bảo hiểm",
        dataIndex: ["payment"],
        key: "payment",
      },
      {
        title: "Trạng thái",
        dataIndex: ["status"],
        key: "status",
      },
      {
        title: "",
        render: (_, { id }) => (
          <Button
            icon={<EyeOutlined />}
            onClick={() =>
              navigate(
                generatePath(
                  user.role == "customer"
                    ? ROUTES.CUSTOMER_COMPENSATION_DETAILS
                    : user.role === "staff"
                    ? ROUTES.STAFF_COMPENSATION_DETAILS
                    : ROUTES.MANAGER_COMPENSATION_DETAILS,
                  {
                    id,
                  }
                )
              )
            }
          ></Button>
        ),
        width: "10%",
      },
    ],
    [JSON.stringify(compensations), JSON.stringify(user)]
  );

  return (
    <>
      <Title className="title">Danh sách hợp đồng</Title>
      <Table columns={columns} dataSource={compensations} />
    </>
  );
}
