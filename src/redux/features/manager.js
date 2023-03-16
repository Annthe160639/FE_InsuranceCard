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

const initialState = {
  manager: {},
  loading: false,
};

export const managerRegister = createAsyncThunk(
  "@Manager/Register",
  (
    { username, password, name, gmail, phone, address, ci },
    { rejectWithValue }
  ) => {
    try {
      axios
        .post(
          "http://localhost:8080/api/manager/register",
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

export const managerResetPassword = createAsyncThunk(
  "@Manager/Password",
  ({ username }, { rejectWithValue }) => {
    try {
      axios
        .post(
          "http://localhost:8080/api/manager/password/reset",
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

export const managerLogin = createAsyncThunk(
  "@Manager/Login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await axios
        .post(
          "http://localhost:8080/api/manager/login",
          {
            username,
            password,
          },
          config
        )
        .then(({ data }) => {
          console.log(data);
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

export const fetchManagerInfor = createAsyncThunk(
  "@Manager/Infors",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .get("http://localhost:8080/api/manager/profile", config)
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
  "@Manager/Update",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .put("http://localhost:8080/api/manager/profile/edit", values, config)
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
  "@Manager/Logout",
  async (value, { rejectWithValue }) => {
    return null;
  }
);

export const getManagerUserSession = createAsyncThunk(
  "@Manager/GetUserSession",
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
export const insertContractType = createAsyncThunk(
  "@Manager/InsertContractType",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .post(
          "http://localhost:8080/api/manager/contract/type/add",
          values,
          config
        )
        .then(({ data }) => {
          return data;
        })
        .catch(({ response: { data } }) => {
          throw new Error(data);
        });
    } catch (_error) {
      return rejectWithValue(
        "An error occurred while insert new contract type"
      );
    }
  }
);

export const updateContractType = createAsyncThunk(
  "@Manager/updateContractType",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .post(
          "http://localhost:8080/api/manager/contract/type/edit",
          values,
          config
        )
        .then(({ data }) => {
          return data;
        })
        .catch(({ response: { data } }) => {
          throw new Error(data);
        });
    } catch (_error) {
      return rejectWithValue(
        "An error occurred while insert new contract type"
      );
    }
  }
);
export const fetchAllCustomers = createAsyncThunk(
  "@Manager/fetchAllCustomers",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .get("http://localhost:8080/api/manager/customer/list", config)
        .then(({ data }) => {
          return data;
        })
        .catch(({ response: { data } }) => {
          throw new Error(data);
        });
    } catch (_error) {
      return rejectWithValue(
        "An error occurred while insert new contract type"
      );
    }
  }
);

export const fetchAllStaff = createAsyncThunk(
  "@Manager/fetchAllEmployees",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .get("http://localhost:8080/api/manager/staff/list", config)
        .then(({ data }) => {
          return data;
        })
        .catch(({ response: { data } }) => {
          throw new Error(data);
        });
    } catch (_error) {
      return rejectWithValue(
        "An error occurred while insert new contract type"
      );
    }
  }
);
export const fetchAllManager = createAsyncThunk(
  "@Manager/fetchAllManager",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .get("http://localhost:8080/api/manager/list", config)
        .then(({ data }) => {
          return data;
        })
        .catch(({ response: { data } }) => {
          throw new Error(data);
        });
    } catch (_error) {
      return rejectWithValue(
        "An error occurred while insert new contract type"
      );
    }
  }
);

export const changeRoleEmployee = createAsyncThunk(
  "@Manager/changeRoleEmployee",
  async ({ role, id }, { rejectWithValue }) => {
    try {
      return await axios
        .put(
          `http://localhost:8080/api/manager${
            role == "staff" ? "/staff" : ""
          }/edit/${id}`,
          {},
          config
        )
        .then(({ data }) => {
          return data;
        })
        .catch(({ response: { data } }) => {
          throw new Error(data);
        });
    } catch (_error) {
      return rejectWithValue(
        "An error occurred while insert new contract type"
      );
    }
  }
);

export const fetchAllManagerContract = createAsyncThunk(
  "@Manager/fetchAllManagerContract",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .get(
          `http://localhost:8080/api/manager/contract`,
          config
        )
        .then(({ data }) => {
          console.log(data)
          return data;
        })
        .catch(({ response: { data } }) => {
          throw new Error(data);
        });
    } catch (_error) {
      return rejectWithValue(
        "An error occurred while insert new contract type"
      );
    }
  }
);
const { reducer, actions } = createSlice({
  initialState,
  name: "manager",
  reducers: {},
  extraReducers: {
    [managerLogin.pending]: (state) => {
      state.loading = true;
    },
    [managerLogin.fulfilled]: (state, { error, payload: { token } }) => {
      if (token && !error) {
        localStorage.setItem("userToken", token);
        state.manager = parseJwt(token);
      }
      state.loading = false;
    },
    [logout.fulfilled]: (state, payload) => {
      localStorage.removeItem("userToken");
      state.manager = {};
    },
    [getManagerUserSession.fulfilled]: (state, { payload }) => {
      state.manager = payload;
    },
    [managerLogin.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default reducer;
