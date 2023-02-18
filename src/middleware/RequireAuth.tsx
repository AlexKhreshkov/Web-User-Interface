import { useUser } from "../hooks/useStateHooks/useUser";
import { Roles } from "../types/IRole";
import { useLocation, Navigate, Outlet } from "react-router-dom";

interface RequireAuthProps {
    allowedRoles: Roles[]
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {

    const location = useLocation()
    const { user } = useUser()

    if (user?.roleName) {
        if (allowedRoles.includes(user.roleName)) {
            return (
                <Outlet />
            )
        }
    }
    return <Navigate to="/" state={{ from: location }} replace />
}

export default RequireAuth