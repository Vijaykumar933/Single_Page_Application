import axios from "axios";

const API_URL = "http://localhost:8000/auth/jwt"; // Base URL for your Django API

const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/create/`, {
    username,
    password,
  });

  if (response.data.access) {
    // Store tokens in localStorage or sessionStorage
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  delete axios.defaults.headers.common["Authorization"];
};

export default {
  login,
  logout,
};