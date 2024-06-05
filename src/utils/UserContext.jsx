import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: 'Rafael Melo',
        imgProfile: '',
        // imgProfile: 'https://images.unsplash.com/photo-1707845690193-ec178cf78041?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxNzYwODYyMA&ixlib=rb-4.0.3&q=80&w=1080',
        role: 'admin'
    }); 
    // const [user, setUser] = useState(null); 

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
