import { createSlice , createAsyncThunk, createAction } from '@reduxjs/toolkit';
import pcatServices from './pcatServices';

const initialState = {
    pcategories:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };

export const getPcategories = createAsyncThunk(
    "prodCat/all-category",
    async (thunkAPI) => {
      try {
        return await pcatServices.getPcategories();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const createPcategory = createAsyncThunk(
    "prodCat/create-category",
    async (data, thunkAPI) => {
      try {
        return await pcatServices.createPcategory(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const updatePcategory = createAsyncThunk(
    "prodCat/update-category",
    async (data, thunkAPI) => {
      try {
        return await pcatServices.updatePcategory(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const getPcategory = createAsyncThunk(
    "prodCat/get-category",
    async (id, thunkAPI) => {
      try {
        return await pcatServices.getPcategory(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const deletePcategory = createAsyncThunk(
    "prodCat/delete-category",
    async (id, thunkAPI) => {
      try {
        return await pcatServices.deletePcategory(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const resetState = createAction("Reset_all");
export const pcatSlice = createSlice({
    name:'prodCat',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
     builder.addCase(getPcategories.pending , (state)=>{
        state.isLoading = true;
     })
     .addCase(getPcategories.fulfilled , (state,action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        state.pcategories=action.payload;
     })
     .addCase(getPcategories.rejected , (state,action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        state.message= action.error;
     })
     .addCase(createPcategory.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createPcategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.createdPcategory = action.payload;
    })
    .addCase(createPcategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(updatePcategory.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(updatePcategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.updatedPcategory = action.payload;
    })
    .addCase(updatePcategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(getPcategory.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(getPcategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.categoryName = action.payload.title;
    })
    .addCase(getPcategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(deletePcategory.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deletePcategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.deletedPcategory = action.payload;
    })
    .addCase(deletePcategory.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.error;
    })
    .addCase(resetState, () => initialState);
    }
})


export default pcatSlice.reducer;