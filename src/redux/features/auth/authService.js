import axios from "axios";
import {useEffect} from "react";

const BACKEND_URL = process.env.REACT_BACKEND_URL || "http://localhost:4000"

export const API_URL = `${BACKEND_URL}/api/user`;

// Register User
const register = async (userData) => {
    const response = await axios.post(API_URL + '/register', userData);
    return response.data;
}
//login User
const login = async (userData) => {
    const response = await axios.post(API_URL + '/login', userData);
    return response.data;
}
//logout User
const logout = async () => {
    const response = await axios.get(API_URL + '/logout');
    return response.data.message;
}
//login status
const status = async () => {
    const response = await axios.get(API_URL + '/status');
    return response.data.message;
}
//get user
const getUser = async () => {
    const response = await axios.get(API_URL + '/');
    return response.data;
}
//user update
const updateUser = async (userData) => {
    const response = await axios.patch(API_URL + '/update', userData);
    return response.data;
}
//user update phot
const updateUserPhoto = async (photo) => {
    const response = await axios.patch(API_URL + '/update/photo', photo);
    return response.data;
}
const authService = {
    register,
    login,
    logout,
    status,
    getUser,
    updateUser,
    updateUserPhoto,
}
export default authService;