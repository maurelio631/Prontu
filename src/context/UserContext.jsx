import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import { toastErrorAlert } from '../utils/Alerts';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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
                await refreshToken();
            } else {
                toastErrorAlert('Erro ao buscar dados do usuário');
                logout();
            }
        }
    };

    const refreshToken = async () => {
        try {
            await axios.post('/refresh-token');
            await fetchUserData();
        } catch (err) {
            console.error('Error refreshing token', err);
            if (err.response && err.response.status === 401) {
                toastErrorAlert('Sessão expirada. Faça login novamente.');
            } else {
                toastErrorAlert('Erro ao atualizar token');
            }
            logout();
        }
    };


    useEffect(() => {
        fetchUserData()
    }, []);

    const logout = () => {
        setUser(null);
        setLoading(false);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading, refreshToken }}>
            {children}
        </UserContext.Provider>
    );
};
