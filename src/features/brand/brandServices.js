import axios from 'axios';
import { base_url } from '../../utils/baseUrl';
import api from '../../utils/api';

const getBrands = async() => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.get(`${base_url}brand/`,null, config);
    if (response.data){
        return response.data
    }
    return response
}
const createBrand = async(data)=>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.post('brand/',data,config);
    return response

}
const updateBrand = async(data)=>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.put(`brand/${data.id}`,data.brandData,config);
    return response

}

const getBrand = async (id) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.get(`brand/${id}`, null,config);
  
    return response.data;
  };
  const deleteBrand = async(id)=>{
    const response = await api.delete(`brand/${id}`)
    return response.data
  }
const brandService = {
    getBrands,
    createBrand,
    updateBrand,
    getBrand,
    deleteBrand
};

export default brandService;
