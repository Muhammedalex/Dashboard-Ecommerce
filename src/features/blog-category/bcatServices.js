import axios from 'axios';
import { base_url } from '../../utils/baseUrl';
import api from '../../utils/api';

const getBcategories = async() => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.get(`${base_url}b-category/`,null, config);
    if (response.data){
        return response.data
    }
    return response
}
const createBcategory = async(data)=>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.post('b-category/',data,config);
    return response

}
const updateBcategory = async(data)=>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.put(`b-category/${data.id}`,data.categoryData,config);
    return response

}

const getBcategory = async (id) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.get(`b-category/${id}`, null,config);
  
    return response.data;
  };
  const deleteBcategory = async(id)=>{
    const response = await api.delete(`b-category/${id}`)
    return response.data
  }

const bcatService = {
    getBcategories,
    getBcategory,
    deleteBcategory,
    updateBcategory,
    createBcategory,
};

export default bcatService;
