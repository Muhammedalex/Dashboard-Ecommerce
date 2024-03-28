import axios from 'axios';
import { base_url } from '../../utils/baseUrl';
import api from '../../utils/api';

const getPcategories = async() => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.get(`${base_url}p-category/`,null, config);
    if (response.data){
        return response.data
    }
    return response
}
const createPcategory = async(data)=>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.post('p-category/',data,config);
    return response

}
const updatePcategory = async(data)=>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.put(`p-category/${data.id}`,data.categoryData,config);
    return response

}

const getPcategory = async (id) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.get(`p-category/${id}`, null,config);
  
    return response.data;
  };
  const deletePcategory = async(id)=>{
    const response = await api.delete(`p-category/${id}`)
    return response.data
  }
const customerService = {
    getPcategories,
    createPcategory,
    updatePcategory,
    getPcategory,
    deletePcategory
};

export default customerService;
