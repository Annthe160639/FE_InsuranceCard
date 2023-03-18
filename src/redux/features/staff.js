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

export const staffLogin = createAsyncThunk(
  "@Staff/Login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await axios
        .post(
          "http://localhost:8080/api/staff/login",
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

export const logout = createAsyncThunk(
  "@Staff/Logout",
  async (value, { rejectWithValue }) => {
    return null;
  }
);

export const staffContractApprove = createAsyncThunk(
  "@Staff/staffContractApprove",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await axios
        .put(
          `http://localhost:8080/api/staff/contract/accept/${id}`,
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

export const staffContractReject = createAsyncThunk(
  "@Staff/staffContractReject",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await axios
        .put(
          `http://localhost:8080/api/staff/contract/reject/${id}`,
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

export const staffCompensationApprove = createAsyncThunk(
  "@Staff/staffCompensationApprove",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await axios
        .put(
          `http://localhost:8080/api/staff/compensation/accept/${id}`,
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

export const staffCompensationReject = createAsyncThunk(
  "@Staff/staffCompensationReject",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await axios
        .put(
          `http://localhost:8080/api/staff/compensation/reject/${id}`,
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

export const fetchAllStaffContract = createAsyncThunk(
  "@Staff/fetchAllStaffContract",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .get(`http://localhost:8080/api/staff/contract`, config)
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

export const fetchAllStaffContractList = createAsyncThunk(
  "@Staff/fetchAllStaffContractList",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .get(`http://localhost:8080/api/staff/contract/list`, config)
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

export const fetchAllStaffCompensation = createAsyncThunk(
  "@Staff/fetchAllStaffCompensation",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .get(`http://localhost:8080/api/staff/compensation`, config)
        .then(({ data }) => {
          return data;
        })
        .catch(({ response: { data } }) => {
          throw new Error(data);
        });
    } catch (_error) {
      return rejectWithValue(
        "Có lỗi xảy ra khi lấy dữ liệu"
      );
    }
  }
);

export const fetchAllStaffCompensationList = createAsyncThunk(
  "@Staff/fetchAllStaffCompensationList",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .get(`http://localhost:8080/api/staff/compensation/list`, config)
        .then(({ data }) => {
          return data;
        })
        .catch(({ response: { data } }) => {
          throw new Error(data);
        });
    } catch (_error) {
      return rejectWithValue(
        "Có lỗi xảy ra khi lấy dữ liệu"
      );
    }
  }
);

const { reducer, actions } = createSlice({
  initialState,
  name: "manager",
  reducers: {},
  extraReducers: {
    [staffLogin.fulfilled]: (state, { error, payload: { token } }) => {
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
  },
});

export default reducer;
