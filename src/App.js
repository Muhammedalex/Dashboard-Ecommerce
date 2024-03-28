import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import ResetPass from './pages/ResetPass';
import ForgotPass from './pages/ForgotPass';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import BlogCatlist from './pages/BlogCatlist';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import ColorList from './pages/ColorList';
import CategoryList from './pages/CategoryList';
import BrandList from './pages/BrandList';
import ProductList from './pages/ProductList';
import AddBlog from './pages/AddBlog';
import AddCatblog from './pages/AddCatblog';
import AddColor from './pages/AddColor';
import AddBrand from './pages/AddBrand';
import AddProd from './pages/AddProd';
import AddProdCat from './pages/AddProdCat';
import CouponList from './pages/CouponList';
import AddCoupon from './pages/AddCoupon';
import ViewEnq from './pages/ViewEnq';
import ViewOrder from './pages/ViewOrder';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/reset-password' element={<ResetPass />} />
      <Route path='/forgot-password' element={<ForgotPass />} />
      <Route path='/admin' element={<MainLayout />} >
      <Route index element={<Dashboard />}/>
        <Route path='enquiries' element={<Enquiries />}/>
        <Route path='enquiries/:id' element={<ViewEnq />}/>
        <Route path='add-blog' element={<AddBlog />}/>
        <Route path='edit-blog/:id' element={<AddBlog />}/>
        <Route path='add-blog-category' element={<AddCatblog />}/>
        <Route path='edit-blog-category/:id' element={<AddCatblog />}/>
        <Route path='blog-list' element={<BlogList />}/>
        <Route path='blog-category-list' element={<BlogCatlist />}/>
        <Route path='orders' element={<Orders />}/>
        <Route path='orders/:id' element={<ViewOrder />}/>
        <Route path='customers' element={<Customers />}/>
        <Route path='add-color' element={<AddColor />} />
        <Route path='edit-color/:id' element={<AddColor />} />
        <Route path='color-list' element={<ColorList />}/>
        <Route path='category-list' element={<CategoryList />}/>
        <Route path='add-brand' element={<AddBrand />}/>
        <Route path='edit-brand/:id' element={<AddBrand />} />
        <Route path='brand-list' element={<BrandList />}/>
        <Route path='add-product' element={<AddProd/>} />
        <Route path='edit-product/:id' element={<AddProd/>} />
        <Route path='add-product-category' element={<AddProdCat />} />
        <Route path='edit-product-category/:id' element={<AddProdCat />} />
        <Route path='product-list' element={<ProductList />}/>
        <Route path='coupon-list' element={<CouponList />}/>
        <Route path='add-coupon' element={<AddCoupon />}/>
        <Route path='edit-coupon/:id' element={<AddCoupon />}/>


        
      </Route>
    </Routes>
    </BrowserRouter>
    </>   
  );
}

export default App;
