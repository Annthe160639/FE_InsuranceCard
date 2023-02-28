import { Breadcrumb, theme } from "antd";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/features/user";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const handleGetUser = useCallback(async () => {
    const data = await dispatch(getUser({username: 'Ky'}));
    console.log(data);
  }, []);
  handleGetUser();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Guess</Breadcrumb.Item>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
        }}
      >
        Bill is a cat.
      </div>
    </div>
  );
}
