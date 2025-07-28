import { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteRouteProps {
    isAuth: boolean;
    allowedRoles?: string[];
    userRole?: string;
    redirectTo?: string;
    children?: ReactNode;
}

const PrivateRoute: FC<PrivateRouteRouteProps> = ({
    isAuth,
    allowedRoles,
    userRole,
    redirectTo = "/login",
    children,
}) => {
    if (!isAuth) {
        return <Navigate to={redirectTo} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole || "")) {
        return <Navigate to="/courses" replace />;
    }

    return children ? children : <Outlet />;
};

export default PrivateRoute;
