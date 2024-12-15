import axios from "axios";
import {
    getAccessToken,
    getRefreshToken, isAccessTokenExpired,
    isRefreshTokenExpired, removeAccessToken, removeRefreshToken,
    saveAccessToken,
    saveRefreshToken,
    TOKEN_CONFIG,
    updateRefreshToken
} from "../utils/tokenUtil";

// const API_BASE_URL = "http://knnn.me:8081/api";
const API_BASE_URL = "http://knnn.me:8081/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
})

export const regist = async (credentials) => {
    try {
        const response = await api.post("/member/join")

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const login = async (credentials) => {
    try {
        const response = await api.post("/member/login", credentials);


        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getLotteryWinner = async () => {
    try {
        const response = await api.get(`/lottery/winner`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const lotteryList = async () => {
    try {
        let response = await api.get('/lottery');

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteLottery = async (data) => {
    try {
        let response = await api.post(`/lottery/remove`, data);
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

api.interceptors.response.use(
    response => response,
    error => {

        function clearStorage() {
            removeAccessToken()
            removeRefreshToken()
            localStorage.removeItem('user')
        }

        if (!getAccessToken()) {
            clearStorage();
            window.location.href = '/login';
        }

        if (isAccessTokenExpired(getAccessToken())) {
            if (!getRefreshToken()) {
                clearStorage();
                window.location.href = '/login';
            } else {
                // 엑세스 토큰이 존재하고, 엑세스토큰이 만료되었으며, 리프레시 토큰 기간이 유효할때, 서버에 새로운 토큰 요청
                const fetchData = async () => {
                    try {
                        if (!getRefreshToken()) alert('리프레쉬 토큰 없음')
                        else {
                            const token = await updateRefreshToken(getRefreshToken(), api);

                            alert(JSON.stringify(token))

                            saveAccessToken(token.accessToken);
                            saveRefreshToken(token.refreshToken);
                        }
                    } catch (error) {
                        throw error;
                    }
                }

                fetchData();
            }
        }

        return Promise.reject(error);
    }
)