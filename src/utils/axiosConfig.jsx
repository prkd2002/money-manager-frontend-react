import axios from "axios";
import { BASE_URL } from "./apiEndpoints.jsx";

export const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Endpoints qui ne nécessitent pas d’Authorization
const excludeEndpoints = ["/login", "/register", "/status", "/activate", "/health"];

// Request interceptor
axiosConfig.interceptors.request.use((config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) =>
        config.url?.includes(endpoint) // ✅ return implicite
    );

    if (!shouldSkipToken) {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor
axiosConfig.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.error("Server error. Please try again later");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout. Please try again!");
        }

        return Promise.reject(error);
    }
);
