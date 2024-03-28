import React, { useEffect, useState } from "react";
import CustomInput from "./../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "./../features/brand/brandSlice";
import { getPcategories } from "./../features/prod-category/pcatSlice";
import { getColors } from "./../features/color/colorSlice";
import Select from "react-select";
import {
  createProduct,
  getProduct,
  resetState,
  updateProduct,
} from "../features/product/prodSlice";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Dropzone from "react-dropzone";

let schema = Yup.object().shape({
  title: Yup.string().required("Required"),
  desc: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  brand: Yup.string().required("required"),
  category: Yup.string().required("required"),
  color: Yup.array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: Yup.number().required("required"),
  tags: Yup.string().required("Tag is Required"),
});

const AddProd = () => {
  const [colorData, setColorData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const brandState = useSelector((state) => state.brand.brands);
  const colorState = useSelector((state) => state.color.colors);
  const prodCatState = useSelector((state) => state.prodCat.pcategories);
  const imgState = useSelector((state) => state.upload.images);
  const productState = useSelector((state) => state.product);
  const { isSuccess, isError, createdProduct, updatedProduct, product } =
    productState;
  useEffect(() => {
    if (isSuccess && (createdProduct || updatedProduct)) {
      toast.success(
        id ? "Product Updated Successfully" : "Product Added Successfully"
      );
      dispatch(resetState());
      navigate("/admin/product-list");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [
    isSuccess,
    createdProduct,
    updatedProduct,
    isError,
    dispatch,
    navigate,
    id,
  ]);
  const color = colorState.map((i) => ({
    value: i._id,
    label: i.title,
  }));
  const img = imgState.map((i) => ({
    public_id: i.public_id,
    url: i.url,
  }));

  // console.log(color)
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getPcategories());
    dispatch(getColors());
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      title: product?.title || "",
      desc: product?.desc || "",
      category: product?.category || "",
      brand: product?.brand || "",
      price: product?.price || "",
      quantity: product?.quantity || "",
      color: product?.color || "",
      images: product?.images || "",
      tags: product?.tags || "",
    },

    validationSchema: schema,
    onSubmit: (values) => {
      if (id) {
        const data = { id: id, productData: values };
        dispatch(updateProduct(data));
        formik.resetForm();
      } else {
        dispatch(createProduct(values));
        formik.resetForm();
      }
    },
  });
  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    } else {
      dispatch(resetState());
    }
  }, [id, dispatch]);
  useEffect(() => {
    if (id) {
      formik.values.images = img ? img : "";
      formik.values.color = colorData ? colorData : "";
    } else {
      formik.values.images = img ? img : "";
      formik.values.color = colorData ? colorData : [];
    }
  }, [img, formik.values, colorData, id]);
  useEffect(() => {
    if (id && product) {
      formik.setFieldValue("title", product.title, true);
      formik.setFieldValue("desc", product.desc, true);
      formik.setFieldValue("price", product.price, true);
      formik.setFieldValue("category", product.category, true);
      formik.setFieldValue("brand", product.brand, true);
      formik.setFieldValue("color", product.color, true);
      formik.setFieldValue("tags", product.tags, true);
      formik.setFieldValue("images", product.images, true);
      formik.setFieldValue("quantity", product.quantity, true);
    }
  }, [product, id]);
  useEffect(() => {
    if (id) {
      setColorData(product.color || []);
    }
  }, [product.color, setColorData, id]);

  const handleColors = (selectedOptions) => {
    setColorData((prevColorData) => {
      const uniqueOptions = selectedOptions.filter(
        (option) => !prevColorData.some((color) => color.value === option.value)
      );
      const updatedColorData = prevColorData.filter((color) =>
        selectedOptions.some((option) => option.value === color.value)
      );
      return [...updatedColorData, ...uniqueOptions];
    });
  };
  return (
    <div>
      <h3 className="mb-4 title">{id ? "Update Product" : "Add Product"}</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            name="title"
            onChange={formik.handleChange("title")}
            type="text"
            label="Enter product title"
            value={formik.values.title}
          />
          <div className="red">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="my-4">
            <CustomInput
              name="desc"
              onChange={formik.handleChange("desc")}
              type="text"
              label="Enter product desc"
              value={formik.values.desc}
            />
            <div className="red">
              {formik.touched.desc && formik.errors.desc}
            </div>
          </div>
          <CustomInput
            onChange={formik.handleChange("price")}
            value={formik.values.price}
            name="price"
            type="number"
            label="Enter product price"
          />
          <div className="red">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            onChange={formik.handleChange("category")}
            value={formik.values.category}
            name="category"
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="select">Select Product Category</option>
            {prodCatState.map((item, i) => (
              <option key={i} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
          <div className="red">
            {formik.touched.category && formik.errors.category}
          </div>
          <Select
            isMulti
            placeholder="Select colors"
            value={colorData || []} // Use colorData directly
            onChange={(selectedOptions) => handleColors(selectedOptions)}
            options={color}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <div className="red">
            {formik.touched.color && formik.errors.color}
          </div>

          <select
            onChange={formik.handleChange}
            value={formik.values.brand}
            name="brand"
            className="form-control py-3 my-3"
            id=""
          >
            <option value="select">Select a Brand</option>
            {brandState.map((item, i) => (
              <option key={i} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
          <div className="red">
            {formik.touched.brand && formik.errors.brand}
          </div>

          <CustomInput
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            type="number"
            label="Enter product price"
          />
          <div className="red">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <select
            name="tags"
            onChange={formik.handleChange}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Tag
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>
          <div className="py-3 my-4">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
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

          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            Add Prdocut
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProd;
