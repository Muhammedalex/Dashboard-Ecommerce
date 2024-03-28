import { createSlice , createAsyncThunk, createAction } from '@reduxjs/toolkit';
import brandServices from './brandServices';

const initialState = {
    brands:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };

export const getBrands = createAsyncThunk(
    "brand/all-brands",
    async (thunkAPI) => {
      try {
        return await brandServices.getBrands();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const createBrand = createAsyncThunk(
    "brand/create-brand",
    async (data, thunkAPI) => {
      try {
        return await brandServices.createBrand(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const updateBrand = createAsyncThunk(
    "brand/update-brand",
    async (data, thunkAPI) => {
      try {
        return await brandServices.updateBrand(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const getBrand = createAsyncThunk(
    "brand/get-brand",
    async (id ,thunkAPI) => {
      try {
        return await brandServices.getBrand(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const deleteBrand = createAsyncThunk(
    "brand/delete-brand",
    async (id ,thunkAPI) => {
      try {
        return await brandServices.deleteBrand(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const resetState = createAction("Reset_all");

export const brandSlice = createSlice({
    name:'brand',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
     builder.addCase(getBrands.pending , (state)=>{
        state.isLoading = true;
     })
     .addCase(getBrands.fulfilled , (state,action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        state.brands=action.payload;
     })
     .addCase(getBrands.rejected , (state,action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        state.message= action.error;
     })
     .addCase(createBrand.pending , (state)=>{
      state.isLoading = true;
   })
   .addCase(createBrand.fulfilled , (state,action)=>{
      state.isLoading=false;
      state.isError=false;
      state.isSuccess=true;
      state.createdBrand = action.payload;
   })
   .addCase(createBrand.rejected , (state,action)=>{
      state.isLoading=false;
      state.isError=true;
      state.isSuccess=false;
      state.message= action.error;
   })
   .addCase(updateBrand.pending , (state)=>{
    state.isLoading = true;
 })
 .addCase(updateBrand.fulfilled , (state,action)=>{
    state.isLoading=false;
    state.isError=false;
    state.isSuccess=true;
    state.updatedBrand = action.payload;
 })
 .addCase(updateBrand.rejected , (state,action)=>{
    state.isLoading=false;
    state.isError=true;
    state.isSuccess=false;
    state.message= action.error;
 })
 .addCase(getBrand.pending , (state)=>{
  state.isLoading = true;
})
.addCase(getBrand.fulfilled , (state,action)=>{
  state.isLoading=false;
  state.isError=false;
  state.isSuccess=true;
  state.brandName = action.payload.title;
})
.addCase(getBrand.rejected , (state,action)=>{
  state.isLoading=false;
  state.isError=true;
  state.isSuccess=false;
  state.message= action.error;
})
.addCase(deleteBrand.pending , (state)=>{
  state.isLoading = true;
})
.addCase(deleteBrand.fulfilled , (state,action)=>{
  state.isLoading=false;
  state.isError=false;
  state.isSuccess=true;
  state.deletedBrand = action.payload;
})
.addCase(deleteBrand.rejected , (state,action)=>{
  state.isLoading=false;
  state.isError=true;
  state.isSuccess=false;
  state.message= action.error;
})
   .addCase(resetState, () => initialState);
    }
})


export default brandSlice.reducer;