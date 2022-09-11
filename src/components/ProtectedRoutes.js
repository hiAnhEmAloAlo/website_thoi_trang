import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';

export default function ProtectedRoutes({ allowedRoles }) {
    const auth = useAuth();
    if (!auth.isLogin) return <Navigate to="/account/login" replace />;
    else
        return allowedRoles.includes(auth.userInfo?.Quyen) ? (
            <Outlet />
        ) : (
            <Navigate to="/" replace />
        );
}
