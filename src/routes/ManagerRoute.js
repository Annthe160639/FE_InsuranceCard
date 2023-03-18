import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routerConst";

export default function ManagerRoute() {
  const user = useSelector(({ user: { user } }) => user);
  if (user.role != "manager") {
    return <Navigate to={ROUTES.MANAGER_SCREEN} replace />;
  }

  return <Outlet />;
}
