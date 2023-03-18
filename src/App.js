import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import RequestContractScreen from "./screens/RequestContractScreen";
import ContractTypeManagement from "./screens/Manager/ContractTypeManagement";
import { ROUTES } from "./constants/routerConst";

import store from "./redux/store";

import "./App.style.css";
import ListContracts from "./screens/Contract/List";
import CommonLayout from "./components/CommonLayout";
import EditProfileScreen from "./screens/EditProfileScreen";
import ViewContract from "./screens/Contract/Details";
import ContractTypeDetails from "./screens/ContractTypeDetailsScreen";
import AddContractTypeScreen from "./screens/Manager/ContractTypeManagement/Add";
import ContractTypeDetailsScreen from "./screens/Manager/ContractTypeManagement/Details";
import ListCustomers from "./screens/Manager/Customer";
import ListEmployees from "./screens/Manager/Employee";
import ListCompensions from "./screens/Compensation";
import ViewCompensation from "./screens/Compensation/Details";
import RequestCompensation from "./screens/Compensation/Request";
import CustomerRoute from "./routes/CustomerRoute";
import StaffRoute from "./routes/StaffRoute";
import ManagerRoute from "./routes/ManagerRoute";
import ForgotPassword from "./screens/ForgotPassword";
import StaffCustomer from "./screens/StaffManagement/Customer";
import ResetPassword from "./screens/ResetPassword";
import CustomerPrivateRoute from "./routes/CustomerPrivateRoute";
import CustomerVerify from "./screens/CustomerVerify";
import GuestRoute from "./routes/GuestRoute";
import Screen404 from "./screens/ErrorScreen/Screen404";
import ChangePassword from "./screens/ChangePassword";

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
            <Route
              path={ROUTES.CUSTOMER_CONTRACT_REQUEST}
              element={<RequestContractScreen />}
            />
            {/* Guest Route */}
            <Route element={<GuestRoute />}>
              <Route path={ROUTES.CUSTOMER_LOGIN} element={<LoginScreen />} />
              <Route
                path={ROUTES.CUSTOMER_REGISTER}
                element={<RegisterScreen />}
              />
              <Route
                path={ROUTES.CUSTOMER_FORGET_PASSWORD}
                element={<ForgotPassword />}
              />
            </Route>
            {/* Private Customer Route */}
            <Route element={<CustomerPrivateRoute />}>
              <Route
                path={ROUTES.CUSTOMER_RESET_PASSWORD}
                element={<ResetPassword />}
              />
              <Route
                path={ROUTES.CUSTOMER_VERIFY}
                element={<CustomerVerify />}
              />
            </Route>

            {/* Customer */}
            <Route element={<CustomerRoute />}>
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
              <Route
                path={ROUTES.CUSTOMER_COMPENSATION_REQUEST}
                element={<RequestCompensation />}
              />
              <Route
                path={ROUTES.CUSTOMER_CHANGE_PASSWORD}
                element={<ChangePassword />}
              />
            </Route>
            {/* Staff */}
            <Route element={<StaffRoute />}>
              <Route path={ROUTES.STAFF_CONTRACT} element={<ListContracts />} />
              <Route
                path={ROUTES.STAFF_CONTRACT_DETAILS}
                element={<ViewContract />}
              />
              <Route
                path={ROUTES.STAFF_COMPENSATION}
                element={<ListCompensions />}
              />
              <Route
                path={ROUTES.STAFF_COMPENSATION_DETAILS}
                element={<ViewCompensation />}
              />
            </Route>
            <Route path={ROUTES.STAFF_CUSTOMER} element={<StaffCustomer />} />
            {/* Manager */}
            <Route element={<ManagerRoute />}>
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
              <Route
                path={ROUTES.MANAGER_CONTRACT}
                element={<ListContracts />}
              />
              <Route
                path={ROUTES.MANAGER_CONTRACT_DETAILS}
                element={<ViewContract />}
              />
              <Route
                path={ROUTES.MANAGER_CUSTOMER}
                element={<ListCustomers />}
              />
              <Route
                path={ROUTES.MANAGER_EMPLOYEE}
                element={<ListEmployees />}
              />
              <Route
                path={ROUTES.MANAGER_COMPENSATION}
                element={<ListCompensions />}
              />
              <Route
                path={ROUTES.MANAGER_COMPENSATION_DETAILS}
                element={<ViewCompensation />}
              />
            </Route>
            <Route path="*" element={<Screen404 />} />
          </Route>
        </Routes>
      </Router>
    </ReduxProvider>
  );
}
