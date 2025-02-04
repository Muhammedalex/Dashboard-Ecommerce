import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import customerService from './customerServices';

const initialState = {
    customers:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
  };

export const getUsers = createAsyncThunk(
    "customers/all-users",
    async (thunkAPI) => {
      try {
        return await customerService.getUsers();
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
export const customerSlice = createSlice({
    name:'customers',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
     builder.addCase(getUsers.pending , (state)=>{
        state.isLoading = true;
     })
     .addCase(getUsers.fulfilled , (state,action)=>{
        state.isLoading=false;
        state.isError=false;
        state.isSuccess=true;
        state.customers=action.payload.data;
     })
     .addCase(getUsers.rejected , (state,action)=>{
        state.isLoading=false;
        state.isError=true;
        state.isSuccess=false;
        state.message= action.error;
     })
    }
})


export default customerSlice.reducer;