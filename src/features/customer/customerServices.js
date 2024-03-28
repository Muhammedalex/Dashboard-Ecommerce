import axios from 'axios';
import { base_url } from '../../utils/baseUrl';

const getUsers = async() => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.get(`${base_url}user/all-users`,null, config);
    if (response.data){
        return response
    }
    return response
}

const customerService = {
    getUsers,
};

export default customerService;
