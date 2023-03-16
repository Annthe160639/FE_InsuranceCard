import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainScreen from "./screens/MainScreen";
import RequestContractScreen from "./screens/RequestContractScreen";
import StaffScreen from "./screens/StaffManagement/StaffScreen";
import StaffContract from "./screens/StaffManagement/Contract";
import ContractTypeManagement from "./screens/Manager/ContractTypeManagement";
import ManagerScreen from "./screens/Manager/ManagerScreen";
import { ROUTES } from "./constants/routerConst";

import store from "./redux/store";

import "./App.style.css";
import ListContracts from "./screens/Contract/List";
import CommonLayout from "./components/CommonLayout";
import EditProfileScreen from "./screens/EditProfileScreen";
import ViewContract from "./screens/Contract/Details";
import ContractTypeDetails from "./screens/ContractTypeDetailsScreen";
import AddContractTypeScreen from "./screens/Manager/ContractTypeManagement/Add";
import ManagerLoginScreen from "./screens/Manager/Login";
import ContractTypeDetailsScreen from "./screens/Manager/ContractTypeManagement/Details";
import ListCustomers from "./screens/StaffManagement/Customer";
import ListEmployees from "./screens/Manager/Employee";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <Routes>
          <Route path={"/"} element={<CommonLayout />}>
            <Route path={"/"} element={<HomeScreen />} />
            <Route path={ROUTES.HOME_ROUTER} element={<HomeScreen />} />
            <Route
              path={ROUTES.CONTRACT_TYPE}
              element={<ContractTypeDetails />}
            />
            {/* Customer */}
            <Route
              path={ROUTES.CUSTOMER_LOGIN_ROUTER}
              element={<LoginScreen />}
            />
            <Route
              path={ROUTES.CUSTOMER_REGISTER_ROUTER}
              element={<RegisterScreen />}
            />
            <Route
              path={ROUTES.CUSTOMER_PROFILE_ROUTER}
              element={<EditProfileScreen />}
            />
            <Route
              path={ROUTES.CUSTOMER_CONTRACT_HISTORY}
              element={<ListContracts />}
            />
            <Route
              path={ROUTES.CUSTOMER_CONTRACT_DETAILS}
              element={<ViewContract />}
            />

            {/* Staff */}
            <Route
              path={ROUTES.STAFF_MAINSCREEN_ROUTER}
              element={<StaffScreen />}
            />
            <Route
              path={ROUTES.STAFF_CONTRACT_ROUTER}
              element={<StaffContract />}
            />

            {/* Manager */}
            <Route
              path={ROUTES.MANAGER_LOGIN_ROUTER}
              element={<ManagerLoginScreen />}
            />
            <Route
              path={ROUTES.MANAGER_CONTRACTYPE_ROUTER}
              element={<ContractTypeManagement />}
            />
            <Route
              path={ROUTES.MANAGER_CONTRACTYPE_DETAILS_ROUTER}
              element={<ContractTypeDetailsScreen />}
            />
            <Route
              path={ROUTES.MANAGER_INSERT_CONTRACTYPE_ROUTER}
              element={<AddContractTypeScreen />}
            />
            <Route
              path={ROUTES.MANAGER_CONTRACT_ROUTER}
              element={<ListContracts />}
            />
            <Route
              path={ROUTES.MANAGER_CUSTOMER_ROUTER}
              element={<ListCustomers />}
            />
            <Route
              path={ROUTES.MANAGER_EMPLOYEE_ROUTER}
              element={<ListEmployees />}
            />
            <Route
              path={ROUTES.MANAGER_SCREEN_ROUTER}
              element={<ManagerScreen />}
            />
            <Route
              path={ROUTES.MANAGER_CONTRACT_DETAILS_ROUTER}
              element={<ViewContract />}
            />
            <Route
              path={ROUTES.CUSTOMER_MAINSCREEN_ROUTER}
              element={<MainScreen />}
            />
            <Route
              path="/customer/contract/request"
              element={<RequestContractScreen />}
            />
            
          </Route>
        </Routes>
      </Router>
    </ReduxProvider>
  );
}
