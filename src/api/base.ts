import axios from 'axios';
const baseURL =  import.meta.env.BASE_URL;

const instance = axios.create({
    baseURL,
    timeout:15000
})

export default instance