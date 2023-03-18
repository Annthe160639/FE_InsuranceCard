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
          return data;
        })
        .catch(({ response: { data } }) => {
          throw data;
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
        .get(`http://localhost:8080/api/manager/contract`, config)
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

export const managerContractApprove = createAsyncThunk(
  "@Manager/managerContractApprove",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await axios
        .put(
          `http://localhost:8080/api/manager/contract/approve/${id}`,
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
      return rejectWithValue("Duyệt đơn không thành công");
    }
  }
);

export const managerContractReject = createAsyncThunk(
  "@Manager/managerContractReject",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await axios
        .put(
          `http://localhost:8080/api/manager/contract/reject/${id}`,
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
      return rejectWithValue("Huỷ đơn không thành công");
    }
  }
);

export const fetchAllManagerCompensation = createAsyncThunk(
  "@Staff/fetchAllManagerCompensation",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .get(`http://localhost:8080/api/manager/compensation`, config)
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

export const fetchAllManagerCompensationList = createAsyncThunk(
  "@Staff/fetchAllManagerCompensationList",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .get(`http://localhost:8080/api/manager/compensation/list`, config)
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

export const managerCompensationApprove = createAsyncThunk(
  "@manager/managerCompensationApprove",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await axios
        .put(
          `http://localhost:8080/api/manager/compensation/approve/${id}`,
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
      return rejectWithValue("Duyệt đơn không thành công");
    }
  }
);

export const managerCompensationReject = createAsyncThunk(
  "@manager/managerCompensationReject",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await axios
        .put(
          `http://localhost:8080/api/manager/compensation/reject/${id}`,
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
      return rejectWithValue("Huỷ hợp đồng đền bù không thành công");
    }
  }
);

export const customerViewListManager = createAsyncThunk(
  "@Customer/list",
  async ({}, { rejectWithValue }) => {
    try {
      const res = await axios
        .get("http://localhost:8080/api/manager/customer/list", config)
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
)

const { reducer, actions } = createSlice({
  initialState,
  name: "manager",
  reducers: {},
  extraReducers: {
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
  },
});

export default reducer;
