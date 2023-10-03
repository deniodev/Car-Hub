import axios from 'axios'

const customApi = axios.create({
  baseURL: 'https://carhub-nxj0.onrender.com/'
});

export default customApi;