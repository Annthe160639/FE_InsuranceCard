import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routerConst";

export default function CustomerRoute() {
  const user = useSelector(({ user: { user } }) => user);
  if (user.role != "customer") {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
}