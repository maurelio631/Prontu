import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toastErrorAlert } from './Alerts';

const UserContext = createContext(); 

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Função para login
    const login = async (data) => {
        try {
            const res = await axios.post('http://localhost:3000/auth', data); // Envia dados de login para a API
            const accessToken = res.data.accessToken; // Pega o accessToken da resposta
            const refreshToken = res.data.refreshToken; // Pega o refreshToken da resposta
            setToken(accessToken); // Armazena o accessToken no estado
            setRefreshToken(refreshToken); // Armazena o refreshToken no estado
            localStorage.setItem('refreshToken', refreshToken); // Armazena o refreshToken no localStorage
            await fetchUserData(accessToken); // Busca dados do usuário com o accessToken
        } catch (err) {
            console.error('Login error', err);
            throw err; // Lança o erro para ser tratado onde a função for chamada
        }
    };

    const fetchUserData = async (accessToken) => {
        try {
            const res = await axios.get('http://localhost:3000/signin', {
                headers: { Authorization: `Bearer ${accessToken}` }, // Passa o accessToken no cabeçalho
            });
            setUser(res.data); // Armazena os dados do usuário no estado
        } catch (err) {
            if (err.response && err.response.status === 401) {
                // Se o accessToken expirar, tenta obter um novo usando o refreshToken
                const newAccessToken = await refreshTokenFunc();
                if (newAccessToken) {
                    await fetchUserData(newAccessToken); // Tenta buscar os dados novamente com o novo accessToken
                }
            } else {
                toastErrorAlert('Erro ao buscar dados do usuário');
                logout(); // Se ocorrer outro erro, faz logout
            }
        } finally {
            setLoading(false); // Define o estado de carregamento como falso
        }
    };

    const refreshTokenFunc = async () => {
        try {
            const storedRefreshToken = localStorage.getItem('refreshToken'); // Pega o refreshToken do localStorage
            const res = await axios.post('http://localhost:3000/refresh-token', { refreshToken: storedRefreshToken }); // Envia o refreshToken para a API
            const accessToken = res.data.accessToken; // Pega o novo accessToken da resposta
            const newRefreshToken = res.data.refreshToken; // Pega o novo refreshToken da resposta
            setToken(accessToken); // Armazena o novo accessToken no estado
            setRefreshToken(newRefreshToken); // Armazena o novo refreshToken no estado
            localStorage.setItem('refreshToken', newRefreshToken); // Atualiza o refreshToken no localStorage
            return accessToken;
        } catch (err) {
            console.error('Error refreshing token', err);
            if (err.response && err.response.status === 401) {
                toastErrorAlert('Sessão expirada. Faça login novamente.');
            }
            logout(); // Se o refreshToken expirar, faz logout
            return null;
        }
    };

    useEffect(() => {
        const storedRefreshToken = localStorage.getItem('refreshToken'); // Pega o refreshToken do localStorage
        if (storedRefreshToken) {
            setRefreshToken(storedRefreshToken); // Armazena o refreshToken no estado
            refreshTokenFunc().then((newAccessToken) => {
                if (newAccessToken) {
                    fetchUserData(newAccessToken); // Busca dados do usuário com o novo accessToken
                }
            });
        } else {
            setLoading(false); // Define o estado de carregamento como falso se não houver refreshToken
        }
    }, []);

    const logout = () => {
        setUser(null); // Reseta o estado do usuário
        setToken(null); // Reseta o estado do accessToken
        setRefreshToken(null); // Reseta o estado do refreshToken
        localStorage.removeItem('refreshToken'); // Remove o refreshToken do localStorage
        setLoading(false); // Define o estado de carregamento como falso
    };

    return (
        <UserContext.Provider value={{ user, token, refreshToken, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};
