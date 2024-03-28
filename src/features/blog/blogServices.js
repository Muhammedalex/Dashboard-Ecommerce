import axios from 'axios';
import { base_url } from '../../utils/baseUrl';
import api from './../../utils/api';

const getBlogs = async() => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.get(`${base_url}blog/`,null, config);
    if (response.data){
        return response.data
    }
    return response
};

const createBlog = async(data)=>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await api.post('blog/', data , config);
    return response.data;
};
const updateBlog = async(data)=>{
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.put(`blog/${data.id}`,data.blogData,config);
    return response

}

const getBlog = async (id) => {
    const config ={
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await api.get(`blog/${id}`, null,config);
  
    return response.data;
  };
  const deleteBlog = async(id)=>{
    const response = await api.delete(`blog/${id}`)
    return response.data
  }

const blogService = {
    getBlogs,
    createBlog,
    updateBlog,
    getBlog,
    deleteBlog
};

export default blogService;
