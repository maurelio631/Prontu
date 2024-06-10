// DarkModeContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
    return useContext(DarkModeContext);
}

export const DarkModeProvider = ({ children }) => {
    const getInitialMode = () => {
        const savedMode = localStorage.getItem('darkMode'); // verifica o tema salvo no localStorage (se tiver)
        if (savedMode !== null) {
            return JSON.parse(savedMode);
        }
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;  //verifica o tema do sistema do usuário se n houver no local
    }

    const [darkMode, setDarkMode] = useState(getInitialMode);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode)); //define o valor do darkMode no localStorage
    }, [darkMode]);

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}
