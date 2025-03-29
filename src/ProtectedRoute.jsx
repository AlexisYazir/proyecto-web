// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ allowedRoles }) {
    const { loading, isAuthenticated, user } = useAuth();

    if (loading) return <h1>Cargando...</h1>; 

    // Si no esta autenticado, redirige al login
    if (!loading && !isAuthenticated) return <Navigate to="/home" replace />;

    // Si el usuario no tiene un rol permitido, redirige al 404
    if (!allowedRoles.includes(user.rol)) {
        return <Navigate to="/404" replace />;
    }

    // Si el usuario esta autenticado y tiene un rol permitido, renderiza las rutas hijas
    return <Outlet />;
}

export default ProtectedRoute;