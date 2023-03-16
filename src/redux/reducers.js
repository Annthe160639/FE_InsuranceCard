import { combineReducers } from "@reduxjs/toolkit";

import user from "./features/user";
import customer from "./features/customer";
import manager from "./features/manager";
import contract from "./features/contract";
import notification from "./features/notification";
import staff from "./features/staff";
import compensation from "./features/compensation";

export default combineReducers({
  contract,
  compensation,
  notification,
  user,
  staff,
  customer,
  manager,
});
