import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Typography, Table, Button, theme, Modal, Form, Input } from "antd";
import { contractTypeList } from "../../../redux/features/contract";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { values } from "lodash";

const { Title } = Typography;

const ContractTypeManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [contractTypes, setContractTypes] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const columns = useMemo(() => [
    {
      title: "Tên hợp đồng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại phương tiện",
      dataIndex: "vehicleType",
      key: "vehicle_type",
    },
    {
      title: "Chi phí",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Mức độ bồi thường",
      dataIndex: ["insuranceLevel"],
      key: "insurance_level",
    },
    {
      title: "Chi tiết",
      dataIndex: ["description"],
      key: "description",
    },
  ]);

  const handleGetContractType = useCallback(() => {
    dispatch(contractTypeList({})).then(({ payload }) => {
      payload = payload.map((contractType) => ({
        key: contractType.id,
        name: contractType.name,
        vehicleType: contractType.vehicleType,
        price: contractType.price,
        insuranceLevel: contractType.insuranceLevel,
        description: contractType.description,
      }));
      setContractTypes(payload);
    });
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    handleGetContractType();
  }, []);

  const AddDataModal = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    const onCreateButtonClick = () => {
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          onCreate(values);
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };
    return (
      <Modal
        visible={visible}
        title="Thêm loại hợp đồng"
        okText="Tạo"
        cancelText="Hủy bỏ"
        onCancel={onCancel}
        onOk={onCreateButtonClick}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên hợp đồng"
            rules={[{ required: true, message: "Hãy nhập Tên hợp đồng!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="vehicleType"
            label="Loại phương tiện"
            rules={[{ required: true, message: "Hãy nhập Loại phương tiện!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Chi phí"
            rules={[{ required: true, message: "Hãy nhập Chi phí!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const handleCreate = (values) => {
    console.log("Received values of form:", values);
    //Close modal when finish
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const deleteContractType = () => {
    console.log("delete");
  };
  return (
    <div>
      <Title style={{ textAlign: "center" }}>Danh sách loại hợp đồng</Title>
      <div style={{ float: "right" }}>
        <Button
          size="large"
          type="primary"
          onClick={() => setModalVisible(true)}
        >
          Thêm mới
        </Button>
        <AddDataModal
          visible={modalVisible}
          onCreate={handleCreate}
          onCancel={handleCancel}
        />
        <Button size="large" type="primary" danger onClick={deleteContractType}>
          Xóa bỏ
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={contractTypes}
      ></Table>
    </div>
  );
};

export default ContractTypeManagement;
