import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from './UserContext'; 
import { Loading } from '../components/Loading';

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
    const { user, loading } = useUser();
    const location = useLocation();

    if (loading) {
        return <Loading/>
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    const isAuthorized = checkPermissions(user.role, location.pathname);

    return isAuthorized ? <Outlet /> : <Navigate to="/page403" />;
};
