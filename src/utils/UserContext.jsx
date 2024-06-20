import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (data) => {
        try {
            const res = await axios.post('http://localhost:3000/auth', data);
            const token = res.data.accessToken;
            setToken(token);
            localStorage.setItem('token', token);
            await fetchUserData(token);
        } catch (err) {
            console.error('Login error', err);
            throw err;
        }
    };

    const fetchUserData = async (token) => {
        try {
            const res = await axios.get('http://localhost:3000/signin', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data);
        } catch (err) {
            console.error('Error fetching user data', err);
            logout(); // Logout if token is invalid
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            fetchUserData(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        setLoading(false);
    };

    return (
        <UserContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};
