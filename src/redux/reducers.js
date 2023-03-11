import { combineReducers } from "@reduxjs/toolkit";

import customer from "./features/customer";
import contract from "./features/contract";
import notification from "./features/notification";

export default combineReducers({
  customer,
  contract,
  notification,
});
