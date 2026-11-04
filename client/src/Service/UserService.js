import axios from "axios";
import { API_BASE_URL } from "./apiConfig.js";

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const addUser = async (user) => {
    return await axios.post(`${API_BASE_URL}/admin/register`, user, {
        headers: getAuthHeaders()
    });
};

export const deleteUser = async (id) => {
    return await axios.delete(`${API_BASE_URL}/admin/users/${id}`, {
        headers: getAuthHeaders()
    });
};

export const fetchUsers = async () => {
    return await axios.get(`${API_BASE_URL}/admin/users`, {
        headers: getAuthHeaders()
    });
};
