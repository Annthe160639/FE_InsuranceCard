import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RequestContractScreen from "./screens/RequestContractScreen";
import ContractStaff from "./screens/StaffManagement/Contract";

import { ROUTES } from "./constants/routerConst";

import store from "./redux/store";

import "./App.style.css";
import ListContracts from "./screens/Contract/ListContracts";
import CommonLayout from "./components/CommonLayout";
import StaffScreen from "./screens/StaffManagement/StaffScreen";



export default function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <Routes>
          <Route path={"/"} element={<CommonLayout />}>
            <Route path={ROUTES.HOME_ROUTER} element={<HomeScreen />} />
            <Route
              path={ROUTES.CUSTOMER_CONTRACT_REQUEST}
              element={<RequestContractScreen />}
            />
            <Route
              path={ROUTES.CUSTOMER_LOGIN_ROUTER}
              element={<LoginScreen />}
            />
            <Route
              path={ROUTES.CUSTOMER_REGISTER_ROUTER}
              element={<RegisterScreen />}
            />
            <Route
              path={ROUTES.CUSTOMER_CONTRACT_HISTORY}
              element={<ListContracts />}
            />
            <Route
              path={ROUTES.STAFF_CONTRACT_ROUTER}
              element={<ContractStaff />}
            />
            <Route
              path={ROUTES.STAFF_MAINSCREEN_ROUTER}
              element={<StaffScreen />}
            />
          </Route>
        </Routes>
      </Router>
    </ReduxProvider>
  );
}
