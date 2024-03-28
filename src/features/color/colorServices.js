import axios from 'axios';
import { base_url } from '../../utils/baseUrl';
import api from '../../utils/api';

const getColors = async() => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.get(`${base_url}color/`,null, config);
    if (response.data){
        return response.data
    }
    return response
}
const createColor = async(data)=>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.post('color/',data,config);
    return response

}
const updateColor = async(data)=>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.put(`color/${data.id}`,data.colorData,config);
    return response

}

const getColor = async (id) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.get(`color/${id}`, null,config);
  
    return response.data;
  };
  const deleteColor = async(id)=>{
    const response = await api.delete(`color/${id}`)
    return response.data
  }
const colorService = {
    getColors,
    createColor,
    updateColor,
    getColor,
    deleteColor
};

export default colorService;
