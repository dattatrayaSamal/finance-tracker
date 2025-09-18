import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update if backend is hosted elsewhere
});

export default API;
