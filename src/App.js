import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPassword from "./screens/ForgotPassword";
import MainScreen from "./screens/MainScreen";
import RequestCompensation from "./screens/Compensation/RequestCompensation";
import ViewCompensation from "./screens/Compensation/ViewCompensation";
import UpdateProfile from "./screens/Personal/UpdateProfile";
import RequestContractScreen from "./screens/RequestContractScreen";
import Chat from "./screens/Personal/Chat";
import StaffScreen from "./screens/StaffManagement/StaffScreen";
import StaffCustomer from "./screens/StaffManagement/Customer";
import StaffContract from "./screens/StaffManagement/Contract";
import StaffCompensation from "./screens/StaffManagement/Compensation";
import AccountManagement from "./screens/Manager/AccountManagement";
import CompensationManagement from "./screens/Manager/CompensationManagement";
import ContractManagement from "./screens/Manager/ContractManagement";
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

export default function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <Routes>
          <Route path={"/"} element={<CommonLayout />}>
            <Route path={"/"} element={<HomeScreen />} />
            <Route path={ROUTES.HOME_ROUTER} element={<HomeScreen />} />
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
              path={ROUTES.STAFF_MAINSCREEN_ROUTER}
              element={<StaffScreen />}
            />
            <Route
              path={ROUTES.STAFF_CONTRACT_ROUTER}
              element={<StaffContract />}
            />
            <Route
              path={ROUTES.STAFF_COMPENSATION_ROUTER}
              element={<StaffCompensation />}
            />
            <Route
              path={ROUTES.STAFF_CUSTOMER_ROUTER}
              element={<StaffCustomer />}
            />
            <Route
              path={ROUTES.MANAGER_ACCOUNT_ROUTER}
              element={<AccountManagement />}
            />
            <Route
              path={ROUTES.MANAGER_COMPENSATION_ROUTER}
              element={<CompensationManagement />}
            />
            <Route
              path={ROUTES.MANAGER_CONTRACTYPE_ROUTER}
              element={<ContractTypeManagement />}
            />
            <Route
              path={ROUTES.MANAGER_CONTRACT_ROUTER}
              element={<ContractManagement />}
            />
            <Route
              path={ROUTES.MANAGER_SCREEN_ROUTER}
              element={<ManagerScreen />}
            />
            <Route path="/customer/password/reset" />
            <Route
              path="/customer/forgotpassword"
              element={<ForgotPassword />}
            />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route
              path={ROUTES.CUSTOMER_MAINSCREEN_ROUTER}
              element={<MainScreen />}
            />
            <Route
              path="/customer/requestcompensation"
              element={<RequestCompensation />}
            />
            <Route path={ROUTES.CUSTOMER_CONTRACT_DETAILS} element={<ViewContract />} />
            <Route
              path="/customer/viewcompensation"
              element={<ViewCompensation />}
            />
            <Route path="/customer/updateprofile" element={<UpdateProfile />} />
            <Route path="/customer/chat" element={<Chat />} />
            <Route
              path="/customer/forgotpassword"
              element={<ForgotPassword />}
            />
            <Route path="/customer/mainscreen" element={<MainScreen />} />
            <Route
              path="/customer/requestcompensation"
              element={<RequestCompensation />}
            />
            <Route path="/customer/viewcontract" element={<ViewContract />} />
            <Route
              path="/customer/viewcompensation"
              element={<ViewCompensation />}
            />
            <Route path="/customer/updateprofile" element={<UpdateProfile />} />
            <Route path="/customer/chat" element={<Chat />} />
            <Route
              path="/customer/contract/request"
              element={<RequestContractScreen />}
            />
            <Route
              path={ROUTES.CUSTOMER_CONTRACT_TYPE}
              element={<ContractTypeDetails />}
            />
          </Route>
        </Routes>
      </Router>
    </ReduxProvider>
  );
}
