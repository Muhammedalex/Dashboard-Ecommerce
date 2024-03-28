import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServices";

const getUserLocal = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;

const initialState = {
  user: getUserLocal,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "auth/admin-login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(login.fulfilled, (state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data;
      })
      .addCase(login.rejected, (state,action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
        state.user = null;
      });
  },
});

export default authSlice.reducer;