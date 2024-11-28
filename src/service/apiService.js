import axios from "axios";
import {TOKEN_CONFIG} from "../utils/tokenUtil";

// const API_BASE_URL = "http://knnn.me:8081/api";
const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
})

export const login = async (credentials) => {
    try {
        const response = await api.post("/member/login", credentials);


        return response.data;
    } catch (error) {
        throw error;
    }
}

api.interceptors.request.use(
    config => {
        const accessToken = TOKEN_CONFIG.accessToken.storage
            .getItem(TOKEN_CONFIG.accessToken.key);

        if (accessToken) {
            config.headers['Authorization'] = accessToken;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);