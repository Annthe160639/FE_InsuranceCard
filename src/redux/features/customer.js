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
        })
        .catch();
      return { username, password, name, gmail, phone, address, ci };
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);
export const customerResetPassword = createAsyncThunk(
  "@Customer/Password",
  ({ username }, { rejectWithValue }) => {
    try {
      axios
        .post(
          "http://localhost:8080/api/customer/password/reset",
          { username },
          config
        )
        .then((res) => {
        })
        .catch();
      return { username };
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);
export const customerLogin = createAsyncThunk(
  "@Customer/Login",
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
        })
        .catch((_err) => {
          throw new Error(_err)
        });
      return { username, password };
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);

const { reducer } = createSlice({
  initialState,
  name: "customer",
  reducers: {
    setUserLocale(state, action) {
      const { locale } = action.payload;
      localStorage.setItem("_locale", locale || "en_US");
      Object.assign(state, action.payload);
    },
  },
  extraReducers: {
    
  },
});

export default reducer;
