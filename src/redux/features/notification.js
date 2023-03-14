import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import dropRight from "lodash/dropRight";

function getInitialState() {
  return {
    alerts: [],
  };
}

export const createNotification = createAsyncThunk(
  "@Notification/CreateNotification",
  async ({ type, message, description, onClose }, { rejectWithValue }) => {
    console.log(type, message)
    try {
      return { type, message, description, onClose };
    } catch (_error) {}
  }
);

export const removeNotification = createAsyncThunk(
  "@Notification/RemoveNotification",
  async (value, { rejectWithValue }) => {
    try {
    } catch (_error) {}
  }
);

const { reducer, actions } = createSlice({
  name: "notification",
  initialState: getInitialState(),
  reducers: {},
  extraReducers: {
    [createNotification.fulfilled]: (
      state,
      { payload: { type, message, description, onClose } }
    ) => {
      state.alerts.push({ type, message, description, onClose });
    },
    [removeNotification.fulfilled]: (state, payload) => {
      state.alerts = dropRight(state.alerts);
    },
  },
});

export default reducer;
