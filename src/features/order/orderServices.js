import api from "../../utils/api";

const getOrders = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await api.get(`user/get-all-orders`, config);

  return response.data;
};
const getOrder = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await api.get(`user/get-orders/${id}`, config);

  return response.data;
};

const orderServices = {
  getOrders,
  getOrder,
};

export default orderServices;
