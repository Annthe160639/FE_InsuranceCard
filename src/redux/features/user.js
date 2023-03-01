import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

const initialState = {
  user: {
    username: "user",
  },
};

export const getUser = createAsyncThunk(
  "@user/getUser",
  (values, { rejectWithValue }) => {
    try {
      return values;
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);

export const customerRegister = createAsyncThunk(
  "@Customer/Register",
  (
    { username, password, name, gmail, phone, address, ci },
    { rejectWithValue }
  ) => {
    try {
      axios
        .post(
          "http://localhost:8080/api/customer/register",
          { username, password, name, gmail, phone, address, ci },
          config
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch(console.log);
      return { username, password, name, gmail, phone, address, ci };
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);
export const customerResetPassword = createAsyncThunk(
  "@Customer/Password",
  (
    { username},
    { rejectWithValue }
  ) => {
    try {
      axios
        .post(
          "http://localhost:8080/api/customer/password/reset",
          { username},
          config
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch(console.log);
      return { username};
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);
export const login = createAsyncThunk(
  "@user/login",
  ({ username, password }, { rejectWithValue }) => {
    try {
      axios
        .post(
          "http://localhost:8080/api/customer/login",
          {
            username,
            password,
          },
          config
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch(console.log);
      return { username, password };
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);

const { reducer } = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUserLocale(state, action) {
      const { locale } = action.payload;
      localStorage.setItem("_locale", locale || "en_US");
      Object.assign(state, action.payload);
    },
    extraReducers: {
      [getUser.pending]: (state) => {
        state.datagrid.loading = true;
      },
      [getUser.fulfilled]: (state, { payload: { data, _error } }) => {
        console.log(data);
      },
      [getUser.rejected]: (state) => {
        state.datagrid.loading = false;
      },
      [getUser.pending]: (state) => {
        state.datagrid.loading = true;
      },
      [getUser.fulfilled]: (state, { payload: { data, _error } }) => {
        console.log(data);
      },
      [getUser.rejected]: (state) => {
        state.datagrid.loading = false;
      },
    },
  },
});

export default reducer;
