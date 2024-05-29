import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from './UserContext'; // Importa o contexto do usuário

const checkPermissions = (userRole, path) => {
    const permissions = {
        admin: ['/', '/home/pacientes', '/home/prontuario', '/home/agenda', '/home/ajustes'],
        quiropraxista: ['/', '/home/pacientes', '/home/prontuario', '/home/agenda', '/home/ajustes'],
        secretaria: ['/', '/home/pacientes', '/home/agenda', '/home/ajustes']
    };

    return permissions[userRole]?.includes(path);
};

export const ProtectedRoutes = () => {
    const { user } = useUser();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" />;
    }

    const isAuthorized = checkPermissions(user.role, location.pathname);

    return isAuthorized ? <Outlet /> : <Navigate to="/page403" />;
};
