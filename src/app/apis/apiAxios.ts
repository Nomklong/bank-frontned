import axios from 'axios';
import * as dotenv from "dotenv";
dotenv.config();

const apiAxios = axios.create({
  baseURL: process.env.REACT_API_ENDPOINT,
});

export default apiAxios;
