import { createSlice , createAsyncThunk, createAction } from '@reduxjs/toolkit';
import prodService from './prodServices';


const initialState = {
    products:[],
    product:{},
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };

export const getProducts = createAsyncThunk(
    "product/all-products",
    async ( thunkAPI) => {
      try {
        return await prodService.getProducts();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const createProduct = createAsyncThunk(
    "product/create-product",
    async (data, thunkAPI) => {
      try {
        return await prodService.createProduct(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const updateProduct = createAsyncThunk(
    "product/update-product",
    async (data, thunkAPI) => {
      try {
        return await prodService.updateProduct(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const getProduct = createAsyncThunk(
    "product/get-product",
    async (id ,thunkAPI) => {
      try {
        return await prodService.getProduct(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const deleteProduct = createAsyncThunk(
    "product/delete-product",
    async (id ,thunkAPI) => {
      try {
        return await prodService.deleteProduct(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  export const resetState = createAction("Reset_all");
export const prodSlice = createSlice({
    name:'product',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
     builder.addCase(getProducts.pending , (state)=>{
        state.isLoading = true;
     })
     .addCase(getProducts.fulfilled , (state,action)=>{
        state.isLoading=false;
        state.isError=false;
        state.products=action.payload.data;
     })
     .addCase(getProducts.rejected , (state,action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        state.message= action.error;
     })
     .addCase(createProduct.pending , (state)=>{
      state.isLoading = true;
   })
   .addCase(createProduct.fulfilled , (state,action)=>{
      state.isLoading=false;
      state.isError=false;
      state.isSuccess=true;
      state.createdProduct = action.payload;
   })
   .addCase(createProduct.rejected , (state,action)=>{
      state.isLoading=false;
      state.isError=true;
      state.isSuccess=false;
      state.message= action.error;
   })
   .addCase(updateProduct.pending , (state)=>{
    state.isLoading = true;
 })
 .addCase(updateProduct.fulfilled , (state,action)=>{
    state.isLoading=false;
    state.isError=false;
    state.isSuccess=true;
    state.updatedProduct = action.payload;
 })
 .addCase(updateProduct.rejected , (state,action)=>{
    state.isLoading=false;
    state.isError=true;
    state.isSuccess=false;
    state.message= action.error;
 })
 .addCase(getProduct.pending , (state)=>{
  state.isLoading = true;
})
.addCase(getProduct.fulfilled , (state,action)=>{
  state.isLoading=false;
  state.isError=false;
  state.isSuccess=true;
  state.product = action.payload
})
.addCase(getProduct.rejected , (state,action)=>{
  state.isLoading=false;
  state.isError=true;
  state.isSuccess=false;
  state.message= action.error;
})
.addCase(deleteProduct.pending , (state)=>{
  state.isLoading = true;
})
.addCase(deleteProduct.fulfilled , (state,action)=>{
  state.isLoading=false;
  state.isError=false;
  state.isSuccess=true;
  state.deletedProduct = action.payload;
})
.addCase(deleteProduct.rejected , (state,action)=>{
  state.isLoading=false;
  state.isError=true;
  state.isSuccess=false;
  state.message= action.error;
})
   .addCase(resetState, () => initialState);
    }
})


export default prodSlice.reducer;