import axios from 'axios';
import * as dotenv from "dotenv";

const apiAxios = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

export default apiAxios;
