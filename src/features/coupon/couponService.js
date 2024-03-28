import api from "../../utils/api";

const getCoupons = async () => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
  const response = await api.get(`coupon/`, config);

  return response.data;
};

const createCoupons = async (coupon) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.post(`coupon/`, coupon, config);

  return response.data;
};
const updateCoupon = async (coupon) => {
  const config ={
    headers: {
        'Content-Type': 'application/json'
    }
}
const response = await api.put(`coupon/${coupon.id}`,coupon.couponData,config);
return response.data

};
const getCoupon = async (id) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.get(`coupon/${id}`, config);

  return response.data;
};

const deleteCoupon = async (id) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.delete(`coupon/${id}`, config);

  return response.data;
};
const couponService = {
  getCoupons,
  createCoupons,
  deleteCoupon,
  getCoupon,
  updateCoupon,
};

export default couponService;