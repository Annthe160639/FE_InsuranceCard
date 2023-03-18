import { Button, Result } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../constants/routerConst";
import { customerVerify } from "../../redux/features/customer";
import { createNotification } from "../../redux/features/notification";

export default function CustomerVerify() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [failed, setFailed] = useState(true);
  const key = searchParams.get("key");

  const handleVerifyCustomer = useCallback(async () => {
    const { error } = await dispatch(customerVerify({ key }));
    await dispatch(
      createNotification({
        type: error ? "error" : "success",
        message: error ? error : "Xác thực tài khoản thành công!",
      })
    );
    setFailed(!!error);
  }, []);

  useEffect(() => {
    handleVerifyCustomer();
  }, []);

  return (
    <>
      {failed ? (
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
      ) : (
        <Result
          status="success"
          title="Xác thực tài khoản thành công!"
          extra={[
            <Link to={ROUTES.HOME}>
              <Button type="default">Trang chủ</Button>
            </Link>,
            <Link to={ROUTES.CUSTOMER_LOGIN}>
              <Button type="primary">Đăng nhập</Button>
            </Link>,
          ]}
        />
      )}
    </>
  );
}
