import axios from 'axios';
import { base_url } from '../../utils/baseUrl';
import api from '../../utils/api';

const getProducts = async() => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.get(`${base_url}product/`,null, config);
    if (response.data){
        return response
    }
    return response
}

const createProduct = async(data)=>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.post('product/',data,config);
    return response
}
const updateProduct = async(data)=>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.put(`product/${data.id}`,data.productData,config);
    return response

}

const getProduct = async (id) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.get(`product/${id}`, null,config);
  
    return response.data;
  };
  const deleteProduct = async(id)=>{
    const response = await api.delete(`product/${id}`)
    return response.data
  }
const prodService = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
};

export default prodService;
