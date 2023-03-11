import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPassword from "./screens/ForgotPassword";
import MainScreen from "./screens/MainScreen/MainScreen";
import CreateContract from "./screens/Contract/CreateContract";
import RequestCompensation from "./screens/Compensation/RequestCompensation";
import ViewContract from "./screens/Contract/ViewContract";
import ViewCompensation from "./screens/Compensation/ViewCompensation";
import UpdateProfile from "./screens/Personal/UpdateProfile";
import RequestContractScreen from "./screens/RequestContractScreen";
import Chat from "./screens/Personal/Chat";

import { ROUTES } from "./constants/routerConst";

import store from "./redux/store";

import "./App.style.css";
import ListContracts from "./screens/Contract/ListContracts";
import CommonLayout from "./components/CommonLayout";



export default function App() {
  return (
    <ReduxProvider store={store}>
      <Router>
        <Routes>
          <Route path={"/"} element={<CommonLayout />}>
            <Route
              path={ROUTES.CUSTOMER_CONTRACT_REQUEST}
              element={<RequestContractScreen />}
            />
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
              path={ROUTES.CUSTOMER_CONTRACT_HISTORY}
              element={<ListContracts />}
            />
          </Route>
        </Routes>
      </Router>
    </ReduxProvider>
  );
}
