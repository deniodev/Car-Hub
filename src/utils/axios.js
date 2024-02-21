import axios from 'axios'

const customApi = axios.create({
  baseURL: 'https://reservation-api-3po5.onrender.com/'
});

export default customApi;