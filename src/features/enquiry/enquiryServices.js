import api from "../../utils/api";


const getEnquiries = async () => {
  const response = await api.get(`enquiry/`);

  return response.data;
};
const deleteEnquiry = async (id) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
  const response = await api.delete(`enquiry/${id}`, config);
  return response.data;
};
const getEnquiry = async (id) => {
  const response = await api.get(`enquiry/${id}`);
  return response.data;
};
const udpateEnquiry = async (enq) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
  const response = await api.put(
    `enquiry/${enq.id}`,
    { status: enq.enqData },
    config
  );
  return response.data;
};
const enquiryService = {
  getEnquiries,
  deleteEnquiry,
  getEnquiry,
  udpateEnquiry,
};

export default enquiryService;