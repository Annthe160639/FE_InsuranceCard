import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routerConst";

export default function Screen404() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn đang truy cập không tồn tại."
      extra={[
        <Link to={ROUTES.HOME}>
          <Button type="default">Trang chủ</Button>
        </Link>,
      ]}
    />
  );
}
