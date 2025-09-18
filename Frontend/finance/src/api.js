import axios from "axios";

const API = axios.create({
  baseURL: "https://finance-tracker-6bvf.onrender.com/api",
});

export default API;
