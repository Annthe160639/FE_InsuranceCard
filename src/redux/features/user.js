import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: "user",
  },
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

const { reducer } = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUserLocale(state, action) {
      const { locale } = action.payload;
      localStorage.setItem("_locale", locale || "en_US");
      Object.assign(state, action.payload);
    },
    extraReducers: {
      [getUser.pending]: (state) => {
        state.datagrid.loading = true;
      },
      [getUser.fulfilled]: (state, { payload: { data, _error } }) => {
        console.log(data);
      },
      [getUser.rejected]: (state) => {
        state.datagrid.loading = false;
      },
    },
  },
});

export default reducer;
