import React, { useEffect } from "react";
import CustomInput from "./../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createBrand, getBrand, resetState, updateBrand } from "../features/brand/brandSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
});
const AddBrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const brandState = useSelector((state) => state.brand);
  const { isSuccess, isLoading, isError, createdBrand , updatedBrand,brandName } = brandState;
  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
     title :brandName||"",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(id){
        const data = {id:id , brandData:values};
        dispatch(updateBrand(data));
        setTimeout(() => {
          navigate("/admin/brand-list");
  }, 3000);
      }
      else{
        dispatch(createBrand(values));
      formik.resetForm();
      setTimeout(() => {
            navigate("/admin/brand-list");
    }, 3000);
      }
    },
  });
  useEffect(()=>{
    if(id){
      dispatch(getBrand(id))
    } else {
      dispatch(resetState());
    }
  },[id , dispatch])
  
  useEffect(() => {
    if (isSuccess && (createdBrand || updatedBrand)) {
      toast.success(id ? "brand Updated Successfully" : "brand Added Successfully");
      dispatch(resetState());
      navigate("/admin/brand-list");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, createdBrand, updatedBrand, isError, dispatch, navigate, id]);

  useEffect(() => {
    if (id && brandName) {
      formik.setFieldValue('title', brandName, true);
    }
  }, [brandName, id ]);
  return (
    <div>
      <h3 className="mb-4">{id? "Update brand":"Add brand"}</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Brand"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <div className="red">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            type="submit"
            disabled={isLoading ? true : false}
            className="btn btn-success border-0 rounded-3 my-5"
          >
           {id ? 'Update brand' : 'Add brand'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
