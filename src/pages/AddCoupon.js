import { React, useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateACoupon,
} from "../features/coupon/couponSlice";
import { formatDateForInput } from "../utils/formatData";

let schema = Yup.object().shape({
  name: Yup.string().required("Coupon Name is Required"),
  expiry: Yup.date().required("Expiry Date is Required"),
  discount: Yup.number().required("Discount Percentage is Required"),
});
const AddCoupon = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const navigate = useNavigate();
//   const id = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);

  const {
    isSuccess,
    isError,
    createdCoupon,
    couponName,
    couponDiscount,
    couponExpiry,
    updatedCoupon,
  } = newCoupon;
  const changeDateFormet = (date) => {
    return new Date(date).toLocaleDateString("en-CA");
  };

  useEffect(() => {
    if (id) {
      dispatch(getACoupon(id));
    } else {
      dispatch(resetState());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isSuccess && (createdCoupon || updatedCoupon)) {
      toast.success(
        id
          ? "Coupon Updated Successfully"
          : "Coupon Added Successfully"
      );
      dispatch(resetState());
     
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [
    isSuccess,
    isError,
    createdCoupon,
    navigate,
    updatedCoupon,
    dispatch,
    id,
  ]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: changeDateFormet(couponExpiry) || changeDateFormet(""),
      discount: couponDiscount || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (id !== undefined) {
        const data = { id: id, couponData: values };
        dispatch(updateACoupon(data));
        setTimeout(() => {
          dispatch(resetState);
          navigate("/admin/coupon-list");
        }, 1000);
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState);
          navigate("/admin/coupon-list");
        }, 1000);
      }
    },
  });
  useEffect(() => {
    if (id && couponName && couponDiscount && couponExpiry) {
      formik.setFieldValue("name", couponName, true);
      formik.setFieldValue("discount", couponDiscount, true);
      formik.setFieldValue("expiry", formatDateForInput(couponExpiry), true);
    }
  }, [couponDiscount, couponExpiry, couponName, id]);

  return (
    <div>
      <h3 className="mb-4 title">
        {id !== undefined ? "Edit" : "Add"} Coupon
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="name"
            onChange={formik.handleChange("name")}
            value={formik.values.name}
            label="Enter Coupon Name"
            id="name"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            name="expiry"
            onChange={formik.handleChange("expiry")}
            value={changeDateFormet(formik.values.expiry)}
            label="Enter Expiry Data"
            id="date"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            name="discount"
            onChange={formik.handleChange("discount")}
            value={formik.values.discount}
            label="Enter Discount"
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {id !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
