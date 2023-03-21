import React, { useCallback, useEffect, useState } from "react";
import {
  Form,
  Button,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Upload,
  Modal,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomerApproveContract } from "../../../redux/features/customer";
import { PageContainer } from "@ant-design/pro-components";
import Joi from "joi";
import { uploadImage } from "../../../redux/features/image";
import { customerCompensationRequest } from "../../../redux/features/compensation";
import { createNotification } from "../../../redux/features/notification";
import { ROUTES } from "../../../constants/routerConst";
import Title from "antd/es/typography/Title";
import { find, random } from "lodash";
import { PlusOutlined } from "@ant-design/icons";
import Axios from "axios";

export default function RequestCompensation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(({ user: { user } }) => user);

  const [form] = Form.useForm();
  const contractId = Form.useWatch("contractId", form);
  const payment = Form.useWatch("payment", form);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [customerContracts, setCustomerContracts] = useState([]);
  const [fileUrlList, setFileUrlList] = useState([]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  // const uploadImage = () => {
  //   const formData = new FormData();
  //   formData.append("file", imageSelected);
  //   formData.append("upload_preset", "zmtq5y1s");
  //   Axios.post(
  //     "https://api.cloudinary.com/v1_1/dlgs1eqbv/image/upload",
  //     formData
  //   ).then((response) => {
  //     setImage(response.data.url)
  //   });
  // };

  const handleFormSubmit = useCallback(
    async (values) => {
      values.images = fileUrlList.map((u) => decodeURIComponent(u)).join("\\/");
      values.payment = totalPayment;
      const { error, payload } = await dispatch(
        customerCompensationRequest(values)
      );
      await dispatch(
        createNotification({
          type: error ? "error" : "success",
          message: error ? payload : "Gửi đơn yêu cầu đền bù thành công",
        })
      );
      if (!error) navigate(ROUTES.CUSTOMER_COMPENSATION_LIST);
    },
    [totalPayment]
  );

  const fetchCustomerContract = useCallback(async () => {
    const { payload } = await dispatch(fetchAllCustomerApproveContract());
    console.log(payload);
    setCustomerContracts(payload);
  }, []);

  useEffect(() => {
    fetchCustomerContract();
  }, []);

  useEffect(() => {
    const contract = find(customerContracts, { typeId: contractId });
    console.log(contractId);
    if (contract && payment > -1) {
      setTotalPayment((contract.contractType.insuranceLevel * payment) / 100);
    }
  }, [contractId, payment]);

  return (
    <PageContainer
      title="Yêu cầu đền bù"
      style={{ backgroundColor: "white", margin: "16px 0" }}
    >
      <Row>
        <Col span={16}>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={handleFormSubmit}
            autoComplete="off"
            layout="vertical"
            form={form}
          >
            <Form.Item wrapperCol={{ span: 24 }} style={{ margin: 0 }}>
              <Form.Item
                label="Nơi xảy ra tai nạn"
                name="accidentAddress"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng điển nơi xảy ra tai nạn!",
                  },
                ]}
                style={{
                  display: "inline-block",
                  width: "calc(70% - 8px)",
                }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Thời điểm xảy ra"
                name="accidentTime"
                wrapperCol={5}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                style={{
                  display: "inline-block",
                  width: "calc(30% - 8px)",
                  margin: "0 8px",
                }}
              >
                <DatePicker
                  disabledDate={(d) =>
                    d.isAfter(new Date().toLocaleDateString())
                  }
                  format="DD-MM-YYYY"
                />
              </Form.Item>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }} style={{ margin: 0 }}>
              <Form.Item
                label="Hợp đồng"
                name="contractId"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn hợp đồng!",
                  },
                ]}
                style={{
                  display: "inline-block",
                  width: "calc(70% - 8px)",
                }}
              >
                <Select
                  options={customerContracts.map(({ contractType }) => ({
                    value: contractType?.id,
                    label: contractType?.name,
                  }))}
                />
              </Form.Item>
              <Form.Item
                label="Số tiền muốn đền bù"
                name="payment"
                style={{
                  display: "inline-block",
                  width: "calc(30% - 8px)",
                  margin: "0 8px",
                }}
                rules={[
                  {
                    validator: (_, value) => {
                      const { error } = Joi.number()
                        .min(1)
                        .max(100)
                        .validate(value);
                      if (!error) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject("Vui lòng nhập 1-100% đền bù!");
                      }
                    },
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace("%", "")}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 15 }} style={{ margin: 0 }}>
              <Title level={3} style={{ margin: 0, color: "#ee1c24" }}>
                Số tiền được đền bù:{" "}
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPayment)}
              </Title>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={8}>
          <Upload
            action={async (file) => {
              const formData = new FormData();
              formData.append("api_key", "514379693734588");
              formData.append("file", file);
              formData.append("public_id", `${user.username}-${Date.now()}`);
              formData.append("timestamp", Date.now());
              formData.append("upload_preset", "btjy3nj3");

              const { url } = await Axios.post(
                "https://api.cloudinary.com/v1_1/dlgs1eqbv/image/upload",
                formData
              )
                .then((response) => {
                  return { url: response.data.url };
                })
                .catch((res) => {
                  return res;
                });
              if (url) {
                console.log(url);
                setFileList(file);
                fileUrlList.push(url);
                setFileUrlList(fileUrlList);
                return Promise.resolve();
              }
              return Promise.reject();
            }}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={(a) => "a"}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
        </Col>
      </Row>
    </PageContainer>
  );
}
