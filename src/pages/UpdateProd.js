import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getPcategory } from "../features/prod-category/pcatSlice";
import { getColors } from "../features/color/colorSlice";
import Select from "react-select";
import { createProduct } from "../features/product/prodSlice";
// import 'react-select/styles.css';

const UpdateProd = () => {
  const dispatch = useDispatch();
  const brandState = useSelector((state) => state.brand.brands);
  const colorState = useSelector((state) => state.color.colors);
  const prodCatState = useSelector((state) => state.prodCat.pcategories);
  const color = colorState.map((i) => ({
    value: i._id,
    label: i.title,
  }));
// console.log(color)
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getPcategory());
    dispatch(getColors());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      category: "",
      brand: "",
      price: "",
      quantity: "",
      color:[],
    //   "title":"Hp-Watch 5",
    // "desc":"hey this is apple product",
    // "category":"Watch",
    // "brand":"Hp",
    // "price":700,
    // "quantity":25,
    // "color":["65a1f650c43f4978191cf0ea","65a1f655c43f4978191cf0ee"]
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      // desc: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
      brand: Yup.string().required("required"),
      category: Yup.string().required("required"),
      color: Yup.array().of(Yup.string()).min(1).required("required"),
      quantity: Yup.number().required("required"),
    }),
    onSubmit: (values) => {
      dispatch(createProduct(values));
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            name="title"
            // onBlur={formik.handleChange("title")}
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
              // onBlur={formik.handleChange("desc")}
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
            <option value="">Select Product Category</option>
            {prodCatState.map((item, i) => (
              <>
                <option key={i} value={item.title}>
                  {item.title}
                </option>
              </>
            ))}
          </select>
          <div className="red">
            {formik.touched.category && formik.errors.category}
          </div>
          <Select
            isMulti
            name="color"
            options={color}
            value={color.filter((c) => formik.values.color.includes(c.value))}
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions.map((option) => option.value);
              formik.setFieldValue('color', selectedValues);
            }}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <div className="red">
            {formik.touched.color && formik.errors.color}
          </div>
          <select
            onChange={formik.handleChange("brand")}
            value={formik.values.brand}
            name="brand"
            className="form-control py-3 my-3"
            id=""
          >
            <option>Select a Brand</option>
            {brandState.map((item, i) => (
              <>
                <option key={i} value={item.title}>
                  {item.title}
                </option>
              </>
            ))}
          </select>
          <div className="red">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <CustomInput
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange("quantity")}
            type="number"
            label="Enter product price"
          />
          <div className="red">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="py-3 my-4"></div>

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

export default UpdateProd;
