import React, { useEffect } from "react";
import CustomInput from "./../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import {  useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createColor, getColor, resetState, updateColor } from "../features/color/colorSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
});
const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const colorState = useSelector((state) => state.color);
  const { isSuccess, isLoading, isError, createdColor , updatedColor,colorName } = colorState;
  

  const formik = useFormik({
    initialValues: {
     title :colorName||"",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(id){
        const data = {id:id , colorData:values};
        dispatch(updateColor(data));
        setTimeout(() => {
          navigate("/admin/color-list");
  }, 3000);
      }
      else{
        dispatch(createColor(values));
      formik.resetForm();
      setTimeout(() => {
            navigate("/admin/color-list");
    }, 3000);
      }
    },
  });
  useEffect(()=>{
    if(id){
      dispatch(getColor(id))
    } else {
      dispatch(resetState());
    }
  },[id , dispatch])
  
  useEffect(() => {
    if (isSuccess && (createdColor || updatedColor)) {
      toast.success(id ? "Color Updated Successfully" : "Color Added Successfully");
      dispatch(resetState());
      navigate("/admin/color-list");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, createdColor, updatedColor, isError, dispatch, navigate, id]);

  useEffect(() => {
    if (id && colorName) {
      formik.setFieldValue('title', colorName, true);
    }
  }, [colorName, id ]);
  return (
    <div>
      <h3 className="mb-4">{id? "Update Color":"Add Color"}</h3>
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
           {id ? 'Update Color' : 'Add Color'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
