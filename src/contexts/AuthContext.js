// import { createContext, useContext, useState } from 'react';
//
// const AuthContext = createContext(null);
//
// export function AuthProvider({ children }) {
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//
//     const login = (userInfo) => {
//         setUser(userInfo);
//         setIsAuthenticated(true);
//     }
//
//     const logout = () => {
//         setUser(null);
//         setIsAuthenticated(false);
//         sessionStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         localStorage.removeItem('refreshToken');
//     }
// }