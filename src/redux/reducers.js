import { combineReducers } from "@reduxjs/toolkit";

import user from "./features/user";
import customer from "./features/customer";
import manager from "./features/manager";
import contract from "./features/contract";
import notification from "./features/notification";

export default combineReducers({
  contract,
  manager,
  customer,
  notification,
  user,
});
