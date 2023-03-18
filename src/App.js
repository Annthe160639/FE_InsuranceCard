import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainScreen from "./screens/MainScreen";
import RequestContractScreen from "./screens/RequestContractScreen";
import StaffScreen from "./screens/StaffManagement/StaffScreen";
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
import ListCompensions from "./screens/Compensation";
import ViewCompensation from "./screens/Compensation/Details";
import StaffCustomer from "./screens/StaffManagement/Customer";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <Routes>
          <Route path={"/"} element={<CommonLayout />}>
            <Route path={"/"} element={<HomeScreen />} />
            <Route path={ROUTES.HOME} element={<HomeScreen />} />
            <Route
              path={ROUTES.CONTRACT_TYPE}
              element={<ContractTypeDetails />}
            />
            {/* Customer */}
            <Route path={ROUTES.CUSTOMER_LOGIN} element={<LoginScreen />} />
            <Route
              path={ROUTES.CUSTOMER_REGISTER}
              element={<RegisterScreen />}
            />
            <Route
              path={ROUTES.CUSTOMER_PROFILE}
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
            <Route
              path={ROUTES.CUSTOMER_COMPENSATION_LIST}
              element={<ListCompensions />}
            />
            <Route
              path={ROUTES.CUSTOMER_COMPENSATION_DETAILS}
              element={<ViewCompensation />}
            />
            {/* Staff */}
            <Route path={ROUTES.STAFF_MAINSCREEN} element={<StaffScreen />} />
            <Route path={ROUTES.STAFF_CONTRACT} element={<ListContracts />} />
            <Route path={ROUTES.STAFF_CONTRACT_DETAILS} element={<ViewContract />} />\
            <Route path={ROUTES.STAFF_CUSTOMER} element={<StaffCustomer />} />
            <Route
              path={ROUTES.STAFF_COMPENSATION}
              element={<ListCompensions />}
            />
            <Route
              path={ROUTES.STAFF_COMPENSATION_DETAILS}
              element={<ViewCompensation />}
            />
            {/* Manager */}
            <Route
              path={ROUTES.MANAGER_LOGIN}
              element={<ManagerLoginScreen />}
            />
            <Route
              path={ROUTES.MANAGER_CONTRACTYPE}
              element={<ContractTypeManagement />}
            />
            <Route
              path={ROUTES.MANAGER_CONTRACTYPE_DETAILS}
              element={<ContractTypeDetailsScreen />}
            />
            <Route
              path={ROUTES.MANAGER_INSERT_CONTRACTYPE}
              element={<AddContractTypeScreen />}
            />
            <Route path={ROUTES.MANAGER_CONTRACT} element={<ListContracts />} />
            <Route path={ROUTES.MANAGER_CUSTOMER} element={<ListCustomers />} />
            <Route path={ROUTES.MANAGER_EMPLOYEE} element={<ListEmployees />} />
            <Route path={ROUTES.MANAGER_SCREEN} element={<ManagerScreen />} />
            <Route
              path={ROUTES.MANAGER_CONTRACT_DETAILS}
              element={<ViewContract />}
            />
            <Route path={ROUTES.CUSTOMER_MAINSCREEN} element={<MainScreen />} />
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
