import axios from "axios";
import { API_BASE_URL } from "./apiConfig.js";

export const login = async (data) => {
    return await axios.post(`${API_BASE_URL}/login`, data);
};
