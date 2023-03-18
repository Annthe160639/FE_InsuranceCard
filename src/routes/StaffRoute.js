import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routerConst";

export default function StaffRoute() {
  const user = useSelector(({ user: { user } }) => user);
  if (user.role != "staff") {
    return <Navigate to={ROUTES.STAFF_MAINSCREEN} replace />;
  }

  return <Outlet />;
}
