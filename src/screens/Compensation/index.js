import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Divider, Table, Tag } from "antd";
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
import {
  fetchAllManagerCompensation,
  fetchAllManagerCompensationList,
} from "../../redux/features/manager";
import { concat, isEmpty, orderBy } from "lodash";

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
      const { payload: list1 } = await dispatch(fetchAllManagerCompensation());
      const { payload: list2 } = await dispatch(
        fetchAllManagerCompensationList()
      );

      res.payload = concat(list1, list2);
    }

    await dispatch(
      createNotification({
        type: res.error ? "error" : "success",
        message: res.error ? "Có lỗi xảy ra khi lấy các hợp đồng đền bù" : "",
      })
    );
    if (res.payload) {
      setCompansations(orderBy(res.payload, "id", "desc"));
    }
  }, []);

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
            contractId && (
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
            )
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
        render: (_, { payment }) =>
          new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "VND",
          }).format(payment),
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (_, { status }) => {
          let color = status === "Đang xử lý" ? "blue" : "";
          if (status === "Ðã duyệt") {
            color = "green";
          } else if (status === "Ðang chờ xử lý") {
            color = "orange";
          } else if (status === "Đã hủy" || status === "Đã từ chối") {
            color = "red";
          }
          return (
            <Tag color={color} key={status}>
              {status.toUpperCase()}
            </Tag>
          );
        },
        filters: [
          {
            text: "Đang xử lý",
            value: "Đang xử lý",
          },
          {
            text: "Ðã duyệt",
            value: "Ðã duyệt",
          },
          {
            text: "Ðang chờ xử lý",
            value: "Ðang chờ xử lý",
          },
          {
            text: "Đã từ chối",
            value: "Đã từ chối",
          },
          {
            text: "Đã hủy",
            value: "Đã hủy",
          },
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0,
      },
      {
        title: "",
        render: (_, { id }) => (
          <Button
            icon={<EyeOutlined />}
            onClick={() =>
              id &&
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
    <div style={{ margin: "16px 0" }}>
      {user.role == "customer" && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          <Button
            type="primary"
            onClick={() => navigate(ROUTES.CUSTOMER_COMPENSATION_REQUEST)}
          >
            Gửi yêu cầu đền bù
          </Button>
        </div>
      )}
      <Table columns={columns} dataSource={compensations} />
    </div>
  );
}
