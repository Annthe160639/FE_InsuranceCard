import {
  AutoComplete,
  Button,
  Col,
  Image,
  Layout,
  Menu,
  Row,
  Space,
} from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { ROUTES } from "../../constants/routerConst";
import Title from "antd/es/typography/Title";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contractTypeDetailsById } from "../../redux/features/contract";
import Paragraph from "antd/es/skeleton/Paragraph";

const menuContent = {
  1: (
    <>
      <label>Đối tượng bảo hiểm</label>
      <p>
        Chủ xe máy tham gia giao thông trên lãnh thổ Nước Cộng hòa Xã hội Chủ
        nghĩa Việt Nam.
      </p>
      <label>Phạm vi bảo hiểm</label>
      <p>
        BIC thay mặt cho chủ xe bồi thường cho các tổn thất về người và tài sản
        cho bên thứ ba (bên bị thiệt hai do xe của chủ xe gây ra).
      </p>
    </>
  ),
  2: (
    <>
      <div class="infomation-box">
        <label>Quyền lợi bảo hiểm</label>

        <p>
          <span style={{ fontSize: "16px" }}>
            <span>
              BIC sẽ thay mặt cho chủ xe bồi thường cho bên thứ ba những thiệt
              hại về người và tài sản, cho hành khách những thiệt hại về người
              với mức tối đa như sau:
            </span>
          </span>
        </p>

        <ul>
          <li>
            <span style={{ fontSize: "16px" }}>
              <span>
                Về người: tối đa 150.000.000 đ / người / vụ tai nạn. Cụ thể:
              </span>
            </span>
          </li>
        </ul>

        <table className="tablean">
          <tbody>
            <tr style={{ border: "1px solid black", padding: "10px" }}>
              <td
                style={{
                  textAlign: "center",
                  width: "19%",
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                <span style={{ fontSize: "16px" }}>
                  <span>
                    <strong>Quyền lợi bảo hiểm</strong>
                  </span>
                </span>
              </td>
              <td
                style={{
                  textAlign: "center",
                  width: "81%",
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                <span style={{ fontSize: "16px" }}>
                  <span>
                    <strong>Mức bồi thường tối đa</strong>
                  </span>
                </span>
              </td>
            </tr>
            <tr style={{ border: "1px solid black", padding: "10px" }}>
              <td style={{ border: "1px solid black", padding: "10px" }}>
                <span style={{ fontSize: "16px" }}>
                  <span>Chết do tai nạn</span>
                </span>
              </td>
              <td style={{ border: "1px solid black", padding: "10px" }}>
                <span style={{ fontSize: "16px" }}>
                  <span>Trả đủ 150.000.000đ / 1 người / 1 vụ</span>
                </span>
              </td>
            </tr>
            <tr style={{ border: "1px solid black", padding: "10px" }}>
              <td style={{ border: "1px solid black", padding: "10px" }}>
                <span style={{ fontSize: "16px" }}>
                  <span>Thương tật do tai nạn</span>
                </span>
              </td>
              <td style={{ border: "1px solid black", padding: "10px" }}>
                <span style={{ fontSize: "16px" }}>
                  <span>
                    Trả theo{" "}
                    <a>
                      <span style={{ color: "#ee1c24" }}>
                        "Bảng quy định trả tiền bồi thường thiệt hại về người"
                      </span>
                    </a>
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <ul>
          <li>
            <span style={{ color: "#ee1c24" }}>
              <span>
                Về tài sản: theo tổn thất thực tế, tối đa 50.000.000đ / vụ tai
                nạn.
              </span>
            </span>
          </li>
        </ul>
      </div>
    </>
  ),
  3: (
    <>
      <label>Biểu phí bảo hiểm</label>
      <p>
        Theo biểu phí bảo hiểm bắt buộc Trách nhiệm dân sự ban hành kèm theo
        Thông tư số 04/2021/TT-BTC ngày 15 tháng 1 năm 2021 của Bộ Tài chính quy
        định chi tiết một số điều của Nghị định số 03/2021/NĐ-CP về bảo hiểm bắt
        buộc trách nhiệm của chủ xe cơ giới
      </p>
    </>
  ),
  4: (
    <>
      <label>Trong mọi trường hợp Quý khách cần hỗ trợ xử lý bồi thường?</label>
      <p>
        Gọi tổng đài 24/7 của BIC: <label>1900 9456</label>
      </p>
    </>
  ),
  5: (
    <>
      <p style={{ fontWeight: "bold" }}>
        Quý khách có thể download tất cả các tài liệu liên quan đến sản phẩm bảo
        hiểm trách nhiệm dân sự chủ xe máy tại đây.
      </p>
      <span>
        <span>
          &nbsp;
          <a
            href="https://mybic.vn/uploads/08-04-2021-09-36-59-213483481.pdf"
            target="_blank"
          >
            <span>
              Nghị định số 03/2021/NĐ-CP về bảo hiểm bắt buộc trách nhiệm của
              chủ xe cơ giới.
            </span>
          </a>
        </span>
      </span>
      <br />
      <br />
      <span>
        <span>
          &nbsp;
          <a
            href="https://mybic.vn/uploads/08-04-2021-09-36-31-386505925.doc"
            target="_blank"
          >
            <span>
              Thông tư số 04/2021/TT-BTC ngày 15 tháng 1 năm 2021 của Bộ Tài
              chính quy định chi tiết một số điều của Nghị định số 03/2021/NĐ-CP
              về bảo hiểm bắt buộc trách nhiệm của chủ xe cơ giới.
            </span>
          </a>
        </span>
      </span>
    </>
  ),
};
export default function ContractTypeDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(({ user: { user } }) => user);
  const { id } = useParams();
  const [content, setContent] = useState(menuContent[1]);
  const [contractTypeDetails, setContractTypeDetails] = useState({});

  const fetchContractTypeDetails = useCallback(async () => {
    const { payload: contractTypeDetails } = await dispatch(
      contractTypeDetailsById({ id })
    );
    setContractTypeDetails(contractTypeDetails);
  }, [id]);

  useEffect(() => {
    fetchContractTypeDetails();
  }, [id]);

  return (
    <>
      <Row className="contract">
        <Col span={20} style={{ margin: "auto" }}>
          <Layout
            style={{
              backgroundColor: "white",
            }}
          >
            <Sider width={"25vw"}>
              <Image
                height={"100%"}
                src="https://mybic.vn/uploads/photos/75/xe-may.jpg"
              />
            </Sider>
            <Content style={{ paddingLeft: "20px" }}>
              <Space direction="vertical">
                <Title className="contractName" level={3} type="danger">
                  BẢO HIỂM TRÁCH NHIỆM DÂN SỰ
                </Title>
                <Space>
                  <label>Phân khúc: </label>
                  <span>{contractTypeDetails.name}</span>
                </Space>
                <Space>
                  <label>Giá bán: </label>
                  <span>
                    {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "VND",
                    }).format(contractTypeDetails.price)}
                  </span>
                </Space>
                <Space>
                  <label>Mức độ bồi thường: </label>
                  <span>
                    {new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "VND",
                    }).format(contractTypeDetails.insuranceLevel)}
                  </span>
                </Space>
                <Space
                  style={{
                    flexDirection: "row",
                    alignItem: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <label style={{ width: 20 }}>Mô tả: </label>
                  <span>{contractTypeDetails.description}</span>
                </Space>
                <Space>
                  <Button
                    type="primary"
                    danger
                    style={{
                      margin: "10px 0",
                      
                    }}
                    size="large"
                    className="btnBuy"
                    onClick={() => {
                      navigate(ROUTES.CUSTOMER_CONTRACT_REQUEST, {
                        state: { contractTypeDetails },
                      });
                    }}
                    
                  >
                    Mua ngay
                  </Button>
                </Space>
              </Space>
            </Content>
          </Layout>
        </Col>
      </Row>
      <Row>
        <Col>
        </Col>
        <Layout
          style={{
            padding: "16px 0",

            //background: colorBgContainer,
          }}
        >
          <Sider
            style={
              {
                //background: colorBgContainer,
              }
            }
            width={300}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys="1"
              style={{
                height: "100%",
                
              }}
              items={[
                { key: 1, label: "Thông tin chung" },
                { key: 2, label: "Quyền lợi bảo hiểm" },
                { key: 3, label: "Biểu phí bảo hiểm" },
                { key: 4, label: "Hướng dẫn bồi thường" },
                { key: 5, label: "Quy tắc, biểu mẫu" },
              ]}
              onSelect={({ key }) => setContent(menuContent[key])}
            />
          </Sider>
          <Content
            className="content"
            style={{
              padding: "24px 24px",
              minHeight: 280,
              backgroundColor: "white",
              marginLeft: "16px",
              textAlign: "left",
            }}
          >
            {content}
          </Content>
        </Layout>
      </Row>
    </>
  );
}
