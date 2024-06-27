import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toastErrorAlert } from '../utils/Alerts';
import { useNavigate } from 'react-router-dom';

const GetCLinicContext = createContext();

export const useClinic = () => useContext(GetCLinicContext);

export const ClinicProvider = ({ children }) => {
    const [clinic, setClinic] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchClinicData = async (slug) => {
        try {
            const res = await axios.get(`http://localhost:3000/clinic/${slug}`)
            const dataFetch = res.data
            setClinic(dataFetch);
        } catch (err) {
            navigate('/')
            toastErrorAlert(err.response.data.error) 
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        const slug = window.location.pathname.split('/')[1];
        fetchClinicData(slug);
    }, []);
    
    return (
        <GetCLinicContext.Provider value={{ clinic, loading, setLoading }}>
            {children}
        </GetCLinicContext.Provider>
    );
};
