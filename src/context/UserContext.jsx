import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import { toastErrorAlert } from '../utils/Alerts';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tokenRefreshAttempted, setTokenRefreshAttempted] = useState(false); // Flag de tentativa de refresh

    const login = async (data) => {
        try {
            await axios.post('/auth', data);
            await fetchUserData();
        } catch (err) {
            console.error('Login error', err);
            throw err;
        }
    };

    const fetchUserData = async () => {
        try {
            const res = await axios.get('/signin');
            setUser(res.data);
            setLoading(false);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                if (!tokenRefreshAttempted) {
                    await refreshToken();
                } else {
                    toastErrorAlert('Sessão expirada. Faça login novamente.');
                    logout();
                }
            } else {
                toastErrorAlert('Erro ao buscar dados do usuário');
                logout();
            }
        }
    };

    const refreshToken = async () => {
        try {
            setTokenRefreshAttempted(true); // Marcar que a tentativa foi feita
            const response = await axios.post('/refresh-token');
            setTokenRefreshAttempted(false); // Resetar a flag após sucesso
            await fetchUserData();
        } catch (err) {
            toastErrorAlert('Sessão expirada. Faça login novamente.');
            logout();
        }
    };

    const logout = () => {
        setUser(null);
        setLoading(false);
        setTokenRefreshAttempted(false); // Resetar a flag ao fazer logout
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading, refreshToken, fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};
