import axios from 'axios';
import { base_url } from '../../utils/baseUrl';

const login = async(userData) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await axios.post(`${base_url}user/admin-login`,userData, config);
    if (response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
    }
    return response
}

const authService = {
    login,
};

export default authService;
