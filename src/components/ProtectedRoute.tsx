import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export default function ProtectedRoute({
    children,
    allowedRoles,
}: ProtectedRouteProps) {
    const role = localStorage.getItem("role");

    if(role && !allowedRoles.includes(role)) {
        return <Navigate to="/not-authorized" replace />;
    }

    return <>{children}</>;
}
