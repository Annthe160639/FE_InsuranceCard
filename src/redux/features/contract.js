import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios
        .get(`http://localhost:8080/api/contract/type/detail/${id}`, config)
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

export const fetchAllContractHistory = createAsyncThunk(
  "@Contract/History",
  async (id, { rejectWithValue }) => {
    try {
      return await axios
        .get(`http://localhost:8080/api/customer/contract/history`, config)
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
  async (value, { rejectWithValue }) => {
    try {
      return await axios
        .get(
          `http://localhost:8080/customer/contract/request/${value.id}`,
          value,
          config
        )
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .catch(() => {});
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
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
