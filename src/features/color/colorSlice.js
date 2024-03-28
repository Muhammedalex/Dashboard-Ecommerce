import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorServices from "./colorServices";

const initialState = {
  colors: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getColors = createAsyncThunk(
  "color/all-colors",
  async (thunkAPI) => {
    try {
      return await colorServices.getColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createColor = createAsyncThunk(
  "color/create-color",
  async (data, thunkAPI) => {
    try {
      return await colorServices.createColor(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateColor = createAsyncThunk(
  "color/update-color",
  async (data, thunkAPI) => {
    try {
      return await colorServices.updateColor(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getColor = createAsyncThunk(
  "color/get-color",
  async (id, thunkAPI) => {
    try {
      return await colorServices.getColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteColor = createAsyncThunk(
  "color/delete-color",
  async (id, thunkAPI) => {
    try {
      return await colorServices.deleteColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdColor = action.payload;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedColor = action.payload;
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colorName = action.payload.title;
      })
      .addCase(getColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedColor = action.payload;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;
