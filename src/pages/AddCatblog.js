import React, { useEffect } from "react";
import CustomInput from "./../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createBcategory, getBcategory, resetState, updateBcategory } from "../features/blog-category/bcatSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
});
const AddCatblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const categoryState = useSelector((state) => state.blogCat);
  const { isSuccess, isLoading, isError, createdBcategory , updatedBcategory,categoryName } = categoryState;
  

  const formik = useFormik({
    initialValues: {
     title :categoryName||"",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(id){
        const data = {id:id , categoryData:values};
        dispatch(updateBcategory(data));
        
      }
      else{
        dispatch(createBcategory(values));
      formik.resetForm();
      
      }
    },
  });
  useEffect(()=>{
    if(id){
      dispatch(getBcategory(id))
    } else {
      dispatch(resetState());
    }
  },[id , dispatch])
  
  useEffect(() => {
    if (isSuccess && (createdBcategory || updatedBcategory)) {
      toast.success(id ? "category Updated Successfully" : "category Added Successfully");
      dispatch(resetState());
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, createdBcategory, updatedBcategory, isError, dispatch, navigate, id]);

  useEffect(() => {
    if (id && categoryName) {
      formik.setFieldValue('title', categoryName, true);
    }
  }, [categoryName, id ]);
  return (
    <div>
      <h3 className="mb-4">{id? "Update category":"Add category"}</h3>
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
           {id ? 'Update Bcategory' : 'Add Bcategory'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCatblog;
