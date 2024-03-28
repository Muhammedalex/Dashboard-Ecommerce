import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import customerReducer from '../features/customer/customerSlice';
import prodReducer from '../features/product/prodSlice';
import brandReducer from '../features/brand/brandSlice';
import pcatReducer from '../features/prod-category/pcatSlice';
import bcatReducer from '../features/blog-category/bcatSlice';
import colorReducer from '../features/color/colorSlice';
import blogReducer from '../features/blog/blogSlice';
import enquiryReducer from '../features/enquiry/enquirySlice';
import orderReducer from '../features/order/orderSlice';
import uploadReducer from '../features/upload/uploadSlice';
import couponReducer from '../features/coupon/couponSlice'

const store = configureStore({
  reducer: {
    auth:authReducer,
    customers:customerReducer,
    product:prodReducer,
    brand:brandReducer,
    prodCat:pcatReducer,
    blogCat:bcatReducer,
    color:colorReducer,
    blog:blogReducer,
    enquiry:enquiryReducer,
    order:orderReducer,
    upload:uploadReducer,
    coupon:couponReducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  // other configuration options if needed
});

export default store;