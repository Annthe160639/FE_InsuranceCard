import { Breadcrumb, theme } from "antd";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/features/user";
import Banner from "../components/Banner";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const handleGetUser = useCallback(async () => {
    const data = await dispatch(getUser({ username: "Ky" }));
    console.log(data);
  }, []);
  handleGetUser();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return <></>;
}
