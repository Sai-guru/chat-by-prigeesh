import axios from "axios";

// const getBaseURL = () => {
//   // In production, use the environment variable or default to /api for same-origin
//   if (import.meta.env.MODE === "development") {
//     return "http://localhost:5000/api";
//   }
//   // For production, use the VITE_API_URL if set, otherwise use /api
//   return import.meta.env.VITE_BACKEND_URL + "/api";
// };
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : ""; // empty string for same-origin in production -actuall i dont even need it yooo

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});
