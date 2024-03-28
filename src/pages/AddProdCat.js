import React, { useEffect } from "react";
import CustomInput from "./../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createPcategory, getPcategory, resetState, updatePcategory } from "../features/prod-category/pcatSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
});
const AddProdCat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const categoryState = useSelector((state) => state.prodCat);
  const { isSuccess, isLoading, isError, createdPcategory , updatedPcategory,categoryName } = categoryState;
  

  const formik = useFormik({
    initialValues: {
     title :categoryName||"",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(id){
        const data = {id:id , categoryData:values};
        dispatch(updatePcategory(data));
        
      }
      else{
        dispatch(createPcategory(values));
      formik.resetForm();
      
      }
    },
  });
  useEffect(()=>{
    if(id){
      dispatch(getPcategory(id))
    } else {
      dispatch(resetState());
    }
  },[id , dispatch])
  
  useEffect(() => {
    if (isSuccess && (createdPcategory || updatedPcategory)) {
      toast.success(id ? "category Updated Successfully" : "category Added Successfully");
      dispatch(resetState());
      navigate("/admin/category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, createdPcategory, updatedPcategory, isError, dispatch, navigate, id]);

  useEffect(() => {
    if (id && categoryName) {
      formik.setFieldValue('title', categoryName, true);
    }
  }, [categoryName, id ]);
  return (
    <div>
      <h3 className="mb-4">{id? "Update Pcategory":"Add Pcategory"}</h3>
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
           {id ? 'Update Pcategory' : 'Add Pcategory'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProdCat;
