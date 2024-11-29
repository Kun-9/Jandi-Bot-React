export const TOKEN_CONFIG = {
    accessToken: {
        key: 'accessToken',
        storage: sessionStorage
    },
    refreshToken: {
        key: 'refreshToken',
        storage: localStorage
    }
};


export const saveAccessToken = (accessToken) => {
    try {
        if (!accessToken) {
            throw new Error('AccessToken을 받지 못했습니다.');
        }

        TOKEN_CONFIG.accessToken.storage
            .setItem(TOKEN_CONFIG.accessToken.key, accessToken);

        return true
    } catch (error) {
        console.error('accessToken 저장 실패', error);
        return false;
    }
}

export const saveRefreshToken = (refreshToken) => {
    try {
        if (!refreshToken) {
            throw new Error('RefreshToken을 받지 못했습니다.')
        }

        TOKEN_CONFIG.refreshToken.storage
            .setItem(TOKEN_CONFIG.refreshToken.key, refreshToken);

        return true
    } catch (error) {
        console.error('refreshToken 저장 실패', error);
        return false;
    }
}

export const getRefreshToken = () => {
    try {
        return TOKEN_CONFIG.refreshToken.storage
            .getItem(TOKEN_CONFIG.refreshToken.key);

    } catch (error) {
        console.error("refreshToken 조회에 실패했습니다.")
        return null;
    }
}

export const getAccessToken = () => {
    try {
        return TOKEN_CONFIG.accessToken.storage
            .getItem(TOKEN_CONFIG.accessToken.key);

    } catch (error) {
        console.error("accessToken 조회에 실패했습니다.")
        return null;
    }
}

export const removeRefreshToken = () => {
    try {
        TOKEN_CONFIG.refreshToken.storage
            .removeItem(TOKEN_CONFIG.refreshToken.key
        );
        return true
    } catch (error) {
        console.error('refreshToken 삭제에 실패했습니다.', error);
        return false
    }
}

export const removeAccessToken = () => {
    try {
        TOKEN_CONFIG.accessToken.storage
            .removeItem(TOKEN_CONFIG.accessToken.key
        );
        return true
    } catch (error) {
        console.error('accessToken 삭제에 실패했습니다.', error);
        return false
    }
}

export const isRefreshTokenExpired = (refreshToken) => {
    try {
        if (!refreshToken) return true;

        const tokenData = JSON.parse(atob(refreshToken.split('.')[1]));

        const expirationTime = tokenData.exp * 1000;

        return Date.now() >= expirationTime;
    } catch (error) {
        console.error("토큰 유효기간 체크 실패", error);
        return true;
    }
}

export const isAccessTokenExpired = (accessToken) => {
    try {
        if (!accessToken) return true;

        const tokenData = JSON.parse(atob(accessToken.split('.')[1]));

        const expirationTime = tokenData.exp * 1000;

        return Date.now() >= expirationTime;
    } catch (error) {
        console.error("토큰 유효기간 체크 실패", error);
        return true;
    }
}

export const updateRefreshToken = async (refreshToken, api) => {
        try {
            const response = await api.post(`/auth/refresh`, refreshToken);

            if (!response.ok) {
                throw new Error('token update 실패')
            }

            const data = response.data.data;
            return {
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            };
        } catch (error) {
            console.error('refreshToken 갱신 에러', error);
            removeRefreshToken();
            throw error;
        }
}