import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Update if deployed
});

export default api;
