import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
        .then((res) => {
          localStorage.setItem("jwtToken", res.token);
          return res;
        })
        .catch((_err) => {
          throw new Error(_err);
        });
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);

export const getUserSession = createAsyncThunk(
  "@Customer/GetUserSession",
  (value, { rejectWithValue }) => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      console.log(parseJwt(jwtToken));
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
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("jwtToken");
    },
  },
  extraReducers: {
    [customerLogin.pending]: (state) => {
      state.loading = true;
    },
    [customerLogin.fulfilled]: (state, { payload: { data, _error } }) => {
      if (data && !_error) {
        localStorage.setItem("jwtToken", data.token);
        state.customer = parseJwt(data.token);
      }
      state.loading = false;
    },
    [customerLogin.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { logout } = actions;

export default reducer;
