import { isEmpty, isNil } from "lodash";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routerConst";

export default function GuestRoute() {
  const user = useSelector(({ user: { user } }) => user);
  if (!isEmpty(user)) {
    return <Navigate to={ROUTES.ERROR["404"]} replace />;
  }

  return <Outlet />;
}
