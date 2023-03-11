import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import parseJwt from "../../utils/jwtToken";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("jwtToken")
      ? `Bearer ${localStorage.getItem("jwtToken")}`
      : "",
  },
};

const initialState = {
  customer: {},
  loading: false,
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
        .then((res) => {})
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
        .then((res) => {})
        .catch();
      return { username };
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);

export const customerLogin = createAsyncThunk(
  "@Customer/Login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await axios
        .post(
          "http://localhost:8080/api/customer/login",
          {
            username,
            password,
          },
          config
        )
        .then(({ data }) => {
          return data;
        })
        .catch(({ response: { data } }) => {
          throw new Error(data);
        });
    } catch (_error) {
      return rejectWithValue(_error);
    }
  }
);

export const logout = createAsyncThunk(
  "@Customer/Logout",
  async (value, { rejectWithValue }) => {
    return null;
  }
);

export const getUserSession = createAsyncThunk(
  "@Customer/GetUserSession",
  (value, { rejectWithValue }) => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      if (parseJwt(jwtToken).exp < Date.now() / 1000) {
        localStorage.clear();
      }
      return parseJwt(jwtToken);
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);

// export const customerLogout = createAsyncThunk(
//   "@Customer/Login",
//   async ({ username, password }, { rejectWithValue }) => {
//     try {
//       return await axios
//         .post(
//           "http://localhost:8080/api/customer/login",
//           {
//             username,
//             password,
//           },
//           config
//         )
//         .then((res) => {
//           return res;
//         })
//         .catch((_err) => {
//           throw new Error(_err);
//         });
//     } catch (_error) {
//       return rejectWithValue("An error occurred while open local directory");
//     }
//   }
// );
const { reducer, actions } = createSlice({
  initialState,
  name: "customer",
  reducers: {},
  extraReducers: {
    [customerLogin.pending]: (state) => {
      state.loading = true;
    },
    [customerLogin.fulfilled]: (state, { error, payload: { token } }) => {
      if (token && !error) {
        localStorage.setItem("jwtToken", token);
        state.customer = parseJwt(token);
      }
      state.loading = false;
    },
    [logout.fulfilled]: (state, payload) => {
      localStorage.removeItem("jwtToken");
      state.customer = {};
    },
    [customerLogin.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default reducer;
