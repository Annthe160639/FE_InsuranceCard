import React, { useCallback } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/user";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const handleLogin = useCallback(() => dispatch(login({username: 'anntc', password: 'anntc'})), []);
  handleLogin();
  return (
    <div>
      <Button>aaa</Button>
    </div>
  );
}
