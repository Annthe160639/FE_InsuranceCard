import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

function getInitialState() {
  return {
    alerts: [],
  };
}

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("userToken")
      ? `Bearer ${localStorage.getItem("userToken")}`
      : "",
  },
};

export const requestNewCompensation = createAsyncThunk(
  "@Compensation/Request",
  async (values, { rejectWithValue }) => {
    try {
      return await axios
        .post(
          `http://localhost:8080/api/customer/compensation/request`,
          values,
          config
        )
        .then((res) => {
          return res.data;
        })
        .catch(() => {});
    } catch (_error) {
      return rejectWithValue("Có lỗi xảy ra khi thêm hợp đồng đền bù");
    }
  }
);

export const fetchAllCustomerCompensation = createAsyncThunk(
  "@Compensation/List",
  async (id, { rejectWithValue }) => {
    try {
      return await axios
        .get(`http://localhost:8080/api/customer/compensation`, config)
        .then((res) => {
          return res.data;
        })
        .catch(() => {});
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);

export const fetchOneCompensation = createAsyncThunk(
  "@Compensation/Details",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      return await axios
        .get(`http://localhost:8080/api/${role}/compensation/${id}`, config)
        .then((res) => {
          return res.data;
        })
        .catch(() => {});
    } catch (_error) {
      return rejectWithValue("An error occurred while open local directory");
    }
  }
);

const { reducer, actions } = createSlice({
  name: "compensation",
  initialState: getInitialState(),
  reducers: {},
  extraReducers: {},
});

export default reducer;
