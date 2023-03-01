import { combineReducers } from "@reduxjs/toolkit";

import customer from "./features/customer";
import contract from "./features/contract";
export default combineReducers({
  customer,
  contract,
});
