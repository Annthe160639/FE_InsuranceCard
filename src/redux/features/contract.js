import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  contracts: [],
  loading: false,
};

export const contractTypeList = createAsyncThunk(
  "@Contract/list",
  async ({}, { rejectWithValue }) => {
    try {
      const res = await axios
        .get("http://localhost:8080/api/contract/type/list", config)
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

export const contractTypeDetailsById = createAsyncThunk(
  "@Contract/Details",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios
        .get(`http://localhost:8080/api/contract/type/${id}`, config)
        .then((res) => {
          return res.data;
        })
        .catch(() => {
          return res;
        });
      return res;
    } catch (_error) {
      return rejectWithValue(
        "An error occurred while getting contract type details"
      );
    }
  }
);

export const fetchAllContractHistory = createAsyncThunk(
  "@Contract/History",
  async (id, { rejectWithValue }) => {
    try {
      return await axios
        .get(`http://localhost:8080/api/customer/contract`, config)
        .then((res) => {
          return res.data;
        })
        .catch(() => {});
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);

export const fetchOneContract = createAsyncThunk(
  "@Contract/Details",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      return await axios
        .get(`http://localhost:8080/api/${role}/contract/${id}`, config)
        .then((res) => {
          return res.data;
        })
        .catch(() => {});
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);

export const requestNewContract = createAsyncThunk(
  "@Contract/Request",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .post(
          `http://localhost:8080/api/customer/contract/request/${values.contractType.id}`,
          values,
          config
        )
        .then((res) => {
          return res.data;
        })
        .catch(() => {});
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);

export const fetchAllContractType = createAsyncThunk(
  "@Contract/Type/History",
  async (id, { rejectWithValue }) => {
    try {
      return await axios
        .get(`http://localhost:8080/api/contract/type/list`, config)
        .then((res) => {
          return res.data;
        })
        .catch(() => {});
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);

export const deleteContractType = createAsyncThunk(
  "@Contract/Type/Delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await axios
        .delete(
          `http://localhost:8080/api/manager/contract/type/delete/${id}`,
          config
        )
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw new Error(err);
        });
    } catch (_error) {
      return rejectWithValue("Có lỗi xảy ra trong quá trình xoá loại hợp đồng");
    }
  }
);

const { reducer } = createSlice({
  initialState,
  name: "contract",
  reducers: {
    setUserLocale(state, action) {
      const { locale } = action.payload;
      localStorage.setItem("_locale", locale || "en_US");
      Object.assign(state, action.payload);
    },
  },
  extraReducers: {
    [contractTypeList.pending]: (state) => {
      state.loading = true;
    },
    [contractTypeList.fulfilled]: (state, payload) => {
      //   if (data && !_error) {
      //     state.contracts = data;
      //   }
    },
    [contractTypeList.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default reducer;
