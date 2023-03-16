import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import parseJwt from "../../utils/jwtToken";

const initialState = {
  user: {},
  loading: false,
};

export const getUser = createAsyncThunk(
  "@user/GetUser",
  (values, { rejectWithValue }) => {
    try {
      const jwtUser = parseJwt(localStorage.getItem("userToken"));
      if (jwtUser.exp < Date.now() / 1000) {
        localStorage.clear();
        return null;
      }
      return jwtUser;
    } catch (_error) {
      return rejectWithValue("Có lỗi xảy ra");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "@user/DeleteUser",
  (values, { rejectWithValue }) => {
    try {
      localStorage.clear();
      return null;
    } catch (_error) {
      return rejectWithValue("Có lỗi xảy ra");
    }
  }
);

export const setUser = createAsyncThunk(
  "@user/SetUser",
  (values, { rejectWithValue }) => {
    try {
      return values;
    } catch (_error) {
      return rejectWithValue("Có lỗi xảy ra");
    }
  }
);

const { reducer, actions } = createSlice({
  initialState,
  name: "user",
  reducers: {},
  extraReducers: {
    [setUser.fulfilled]: (state, { error, payload: { token } }) => {
      if (token && !error) {
        localStorage.setItem("userToken", token);
        state.user = parseJwt(token);
      }
      state.loading = false;
    },
    [getUser.fulfilled]: (state, { error, payload }) => {
      if (payload) {
        state.user = payload;
      }
    },
    [deleteUser.fulfilled]: (state, payload) => {
      state.user = {};
    },
  },
});

export default reducer;
