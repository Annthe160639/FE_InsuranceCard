import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import { ROUTES } from "../constants/routerConst";

export default function CustomerPrivateRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = searchParams.get("key");
  
  if (!key) {
    return <Navigate to={ROUTES.ERROR["404"]} />;
  }

  return <Outlet />;
}
