import { createContext, useContext, useState } from 'react';
import {useAuth as useTokenAuth} from "../hooks/authHook";
import {removeAccessToken, removeRefreshToken, saveAccessToken, saveRefreshToken} from "../utils/tokenUtil";

const AuthContext = createContext(null);


export function AuthProvider({ children }) {
    // 초기값으로 저장되어있는 user 확인
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const {isAuthenticated, isLoading} = useTokenAuth();

    const login = (userData) => {
        setUser(userData.memberInfo);

        saveRefreshToken(userData.token.refreshToken);
        saveAccessToken(userData.token.accessToken);

        localStorage.setItem('user', JSON.stringify(userData.memberInfo));
    };

    const logout = () => {
        setUser(null);

        // 토큰 삭제
        removeRefreshToken();
        removeAccessToken();

        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            isLoading,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

