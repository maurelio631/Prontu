import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 
import { Loading } from '../components/Loading';
import { useEffect } from 'react';

const checkPermissions = (userRole, path) => {
    const permissions = {
        admin: ['/', '/home/pacientes', /^\/home\/prontuario\/[^/]+$/, '/home/agenda', '/home/ajustes', '/home/preregistro'],
        quiropraxista: ['/', '/home/pacientes', /^\/home\/prontuario\/[^/]+$/, '/home/agenda', '/home/ajustes', '/home/preregistro'],
        secretaria: ['/', '/home/pacientes', '/home/agenda', '/home/ajustes', '/home/preregistro']
    };

    return permissions[userRole]?.some((pattern) => {
        if (typeof pattern === 'string') {
            return pattern === path;
        } else if (pattern instanceof RegExp) {
            return pattern.test(path);
        }
        return false;
    });
};


export const ProtectedRoutes = () => {
    const { user, loading, fetchUserData } = useUser();
    const location = useLocation();

    useEffect(() => {
        fetchUserData();
    }, []);

    if (loading) {
        return <Loading/>
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    const isAuthorized = checkPermissions(user.role, location.pathname);

    return isAuthorized ? <Outlet /> : <Navigate to="/page403" />;
};
