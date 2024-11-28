import {useState, useEffect} from "react";
import {getRefreshToken, isTokenExpired} from "../utils/tokenUtil";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const refreshToken = getRefreshToken();
            setIsAuthenticated(!!refreshToken && !isTokenExpired(refreshToken));
            setIsLoading(false);
        };

        checkAuth();

    }, []);

    return {isAuthenticated, isLoading};
}