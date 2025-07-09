import axios from "axios";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (userData) => {
  try {
    const response = await authApi.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response?.data || error.message
    );
    throw error.response?.data || new Error("Registration failed");
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await authApi.post("/auth/login", credentials);
    return response.data; // This should ideally contain a JWT token and/or user info
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error.response?.data || new Error("Login failed");
  }
};
