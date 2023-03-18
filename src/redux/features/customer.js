import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import parseJwt from "../../utils/jwtToken";
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("userToken")
      ? `Bearer ${localStorage.getItem("userToken")}`
      : "",
  },
};

const configForm = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("userToken")
      ? `Bearer ${localStorage.getItem("userToken")}`
      : "",
  },
};

const initialState = {
  customer: {},
  loading: false,
};

export const customerRegister = createAsyncThunk(
  "@Customer/Register",
  async (
    { username, password, name, gmail, phone, address, ci },
    { rejectWithValue }
  ) => {
    try {
      return await axios
        .post(
          "http://localhost:8080/api/customer/register",
          { username, password, name, gmail, phone, address, ci },
          config
        )
        .then((res) => {})
        .catch(({ response: { data } }) => {
          if (data.message) {
            throw data.message;
          }
          throw data;
        });
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);
export const customerVerify = createAsyncThunk(
  "@Customer/Verify",
  async ({ key }, { rejectWithValue }) => {
    try {
      return await axios
        .postForm("http://localhost:8080/api/customer/verify", { key }, config)
        .then((res) => {})
        .catch(({ response: { data } }) => {
          console.log(data);
          if (data.message) {
            throw data.message;
          }
          throw data;
        });
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);

export const customerResetPassword = createAsyncThunk(
  "@Customer/Password",
  async ({ username }, { rejectWithValue }) => {
    try {
      return await axios
        .postForm(
          "http://localhost:8080/api/customer/password/reset",
          { username },
          config
        )
        .then((res) => {})
        .catch(({ response: { data } }) => {
          if (data.message) {
            throw data.message;
          }
          throw data;
        });
    } catch (_error) {
      return rejectWithValue(_error);
    }
  }
);

export const customerChangePassword = createAsyncThunk(
  "@Customer/Change/Password",
  async ({ oldPassword, password, password2 }, { rejectWithValue }) => {
    try {
      return await axios
        .postForm(
          "http://localhost:8080/api/customer/password/change",
          { oldPassword, password, password2 },
          config
        )
        .then((res) => {})
        .catch(({ response: { data } }) => {
          if (data.message) {
            throw data.message;
          }
          throw data;
        });
    } catch (_error) {
      return rejectWithValue(_error);
    }
  }
);

export const customerResetNewPassword = createAsyncThunk(
  "@Customer/Reset/Password",
  async ({ password, password2, key }, { rejectWithValue }) => {
    try {
      return await axios
        .postForm(
          `http://localhost:8080/api/customer/password/new`,
          { password, password2, key },
          config
        )
        .then((res) => {})
        .catch(({ response: { data } }) => {
          console.log(data);
          if (data.message) {
            throw data.message;
          }
          throw data;
        });
    } catch (_error) {
      return rejectWithValue(_error);
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
          throw data;
        });
    } catch (_error) {
      console.log(_error);
      return rejectWithValue(_error);
    }
  }
);

export const fetchCustomerInfor = createAsyncThunk(
  "@Customer/Infors",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .get("http://localhost:8080/api/customer/profile", config)
        .then(({ data }) => {
          return data;
        })
        .catch(({ response: { data } }) => {
          if (data.message) {
            throw data.message;
          }
          throw data;
        });
    } catch (_error) {
      return rejectWithValue(_error);
    }
  }
);

export const fetchAllCustomerApproveContract = createAsyncThunk(
  "@Customer/ApproveContract",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .get("http://localhost:8080/api/customer/approve/contract", config)
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

export const customerContractReject = createAsyncThunk(
  "@Customer/Contract/Cancel",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await axios
        .delete(
          `http://localhost:8080/api/customer/contract/cancel/${id}`,
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

export const updateUserProfile = createAsyncThunk(
  "@Customer/Update",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .put("http://localhost:8080/api/customer/profile/edit", values, config)
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
      const userToken = localStorage.getItem("userToken");
      if (parseJwt(userToken).exp < Date.now() / 1000) {
        localStorage.clear();
        return null;
      }
      return parseJwt(userToken);
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);

export const customerViewList = createAsyncThunk(
  "@Customer/list",
  async ({}, { rejectWithValue }) => {
    try {
      const res = await axios
        .get("http://localhost:8080/api/staff/customer/list", config)
        .then((res) => {
          return res.data;
        })
        .catch(() => {
          return res;
        });
      return res;
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
        localStorage.setItem("userToken", token);
        state.customer = parseJwt(token);
      }
      state.loading = false;
    },
    [logout.fulfilled]: (state, payload) => {
      localStorage.removeItem("userToken");
      state.customer = {};
    },
    [getUserSession.fulfilled]: (state, { payload }) => {
      state.customer = payload;
    },
    [customerLogin.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default reducer;
