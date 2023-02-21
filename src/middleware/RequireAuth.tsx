import { useUser } from "../hooks/useStateHooks/useUser";
import { Roles } from "../types/IRole";
import NotFound from "../pages/NotFound/NotFound";
import { Outlet } from "react-router-dom";

interface RequireAuthProps {
    allowedRoles: Roles[]
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {

    const { user } = useUser()

    //Not found page approach
    if (user?.roleName) {
        if (allowedRoles.includes(user.roleName)) {
            return (
                <Outlet />
            )
        }
    }
    return <NotFound />

    // Redirect approach
    // if (user?.roleName) {
    //     if (allowedRoles.includes(user.roleName)) {
    //         return (
    //             children
    //         )
    //     }
    // }
    // return <Navigate to="/" state={{ from: location }} />
}

export default RequireAuth