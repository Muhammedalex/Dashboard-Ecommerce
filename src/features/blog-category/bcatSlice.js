import { createSlice , createAsyncThunk, createAction } from '@reduxjs/toolkit';
import bcatServices from './bcatServices';

const initialState = {
    bcategories:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };

export const getBcategories = createAsyncThunk(
    "blogCat/all-category",
    async (thunkAPI) => {
      try {
        return await bcatServices.getBcategories();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const createBcategory = createAsyncThunk(
    "blogCat/create-category",
    async (data, thunkAPI) => {
      try {
        return await bcatServices.createBcategory(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const updateBcategory = createAsyncThunk(
    "blogCat/update-category",
    async (data, thunkAPI) => {
      try {
        return await bcatServices.updateBcategory(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const getBcategory = createAsyncThunk(
    "blogCat/get-category",
    async (id, thunkAPI) => {
      try {
        return await bcatServices.getBcategory(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const deleteBcategory = createAsyncThunk(
    "blogCat/delete-category",
    async (id, thunkAPI) => {
      try {
        return await bcatServices.deleteBcategory(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const resetState = createAction("Reset_all");
export const bcatSlice = createSlice({
    name:'blogCat',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
     builder.addCase(getBcategories.pending , (state)=>{
        state.isLoading = true;
     })
     .addCase(getBcategories.fulfilled , (state,action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        state.bcategories=action.payload;
     })
     .addCase(getBcategories.rejected , (state,action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        state.message= action.error;
     })
     .addCase(createBcategory.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createBcategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.createdBcategory = action.payload;
    })
    .addCase(createBcategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(updateBcategory.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updateBcategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.updatedBcategory = action.payload;
    })
    .addCase(updateBcategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(getBcategory.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getBcategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.categoryName = action.payload.title;
    })
    .addCase(getBcategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(deleteBcategory.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteBcategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.deletedBcategory = action.payload;
    })
    .addCase(deleteBcategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(resetState, () => initialState);
    }
})


export default bcatSlice.reducer;