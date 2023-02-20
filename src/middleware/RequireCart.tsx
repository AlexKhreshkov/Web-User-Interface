import { useCartState } from "../hooks/useStateHooks/useCartState";
import { useLocation, Navigate, Outlet } from "react-router-dom";


const RequireCart = () => {

    const location = useLocation()
    const fromPage = location.state?.from?.pathname || "/"

    const { cartLength } = useCartState()

    if (cartLength > 0) {
        return (
            <Outlet />
        )
    }
    return <Navigate to="/" state={{ from: fromPage }} replace />
}

export default RequireCart