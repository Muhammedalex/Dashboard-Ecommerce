import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { delImg, uploadImg } from './../features/upload/uploadSlice';
import * as Yup from "yup";
import { useFormik } from "formik";
import { createBlog, getBlog, resetState, updateBlog } from "../features/blog/blogSlice";
import { toast } from "react-toastify";
import { getBcategories } from './../features/blog-category/bcatSlice';
let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  desc: Yup.string().required("Description is Required"),
  category: Yup.string().required("Category is Required"),
});

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.blogCat.bcategories);
  const blogState = useSelector((state) => state.blog);
  const {
    isSuccess,
    isError,
    createdBlog,
    blogName,
    blogDesc,
    blogCategory,
    blogImages,
    updatedBlog,
  } = blogState;

  const img = imgState.map((i,j) => ({
    public_id: i.public_id,
    url: i.url,
  }));

  const formik = useFormik({
    initialValues: {
      title: blogName|| "",
      desc: blogDesc || "",
      category: blogCategory || "",
      images: blogImages || [],
    },

    validationSchema:schema,
    onSubmit: (values) => {
      if(id){
        const data = {id:id , blogData :values};
        dispatch(updateBlog(data));
        setTimeout(() => {
          navigate("/admin/blog-list");
  }, 3000);
      }
      else{
        dispatch(createBlog(values));
      formik.resetForm();
      setTimeout(() => {
            navigate("/admin/blog-list");
    }, 3000);
      }
    },
  });
  useEffect(() => {
    dispatch(getBcategories());
  }, [dispatch]);
  useEffect(()=>{
    if(id){
      dispatch(getBlog(id))
    } else {
      dispatch(resetState());
    }
  },[id , dispatch])
  useEffect(() => {
    if (isSuccess && (createdBlog || updatedBlog)) {
      toast.success(id ? "blog Updated Successfully" : "blog Added Successfully");
      dispatch(resetState());
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, createdBlog, updatedBlog, isError, dispatch, navigate, id]);
  useEffect(() => {
    formik.values.images = img;
  }, [img,imgState, formik.values]);
  useEffect(() => {
    if (id && blogName && blogDesc && blogCategory && blogImages) {
      formik.setFieldValue('title', blogName, true);
      formik.setFieldValue('desc', blogDesc, true);
      formik.setFieldValue('category', blogCategory, true);
      formik.setFieldValue('images', blogImages, true);
    }
  }, [blogCategory,blogDesc,blogImages,blogName, id ]);
  return (
    <div>
      <h3 className="mb-4">Add Blog</h3>
      
      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput type="text" name="title" value={formik.values.title} onChange={formik.handleChange} label="Enter Blog Title" />
          <div className="red">
            {formik.touched.title && formik.errors.title}
          </div>
          <textarea type="text" name="desc" value={formik.values.desc} onChange={formik.handleChange} style={{
    resize: "both",
    width: "300px",
    height: "100px",
    /* Additional styling if necessary */
  }} label="Enter Blog Desc" />
          <div className="red">
            {formik.touched.desc && formik.errors.desc}
          </div>
          <select
            onChange={formik.handleChange("category")}
            value={formik.values.category}
            name="category"
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Product Category</option>
            {bCatState.map((item, i) => (
             
                <option key={item.title} value={item.title}>
                  {item.title}
                </option>
            ))}
          </select>
          <div className="red">
            {formik.touched.category && formik.errors.category}
          </div>
          
          <div className="py-3 my-4">
          <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
    
  )}
</Dropzone>
<div className="showimages d-flex flex-wrap mt-3 gap-3">
            {imgState?.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          </div>
          <button type="submit" className="btn btn-success my-5">
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
