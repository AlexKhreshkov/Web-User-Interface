import { useUser } from "../hooks/useStateHooks/useUser";
import { Roles } from "../types/IRole";
import { useLocation, Navigate, Outlet } from "react-router-dom";

interface RequireAuthProps {
    allowedRoles: Roles[]
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {

    const location = useLocation()
    const fromPage = location.state?.from?.pathname || "/"

    const { user } = useUser()

    if (user?.roleName) {
        if (allowedRoles.includes(user.roleName)) {
            return (
                <Outlet />
            )
        }
    }
    return <Navigate to={fromPage} state={{ from: fromPage }} replace />
}

export default RequireAuth