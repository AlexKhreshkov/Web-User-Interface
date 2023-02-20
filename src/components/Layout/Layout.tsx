import cl from "./Layout.module.css"
import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import { Loader } from "../../UI/loaders/Loader"
import { useAppDispatch } from "../../hooks/useRedux"
import { currentAdminExists, currentUserExists, getCurrentAdmin, getCurrentUser } from "../../services/authService"
import { fetchUserResponse } from "../../store/slices/userSlice"
import { addUser } from "../../store/slices/userSlice"
import { Roles } from "../../types/IRole"
import { fetchCartProducts, fetchProductsToCart, fetchUserCart } from "../../store/slices/cartSlice"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

export const Layout = () => {

    const dispatch = useAppDispatch()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        let roleName: Roles
        let username = ""
        setLoading(true)
        async function getData() {
            if (currentUserExists()) {
                username = getCurrentUser()!
                roleName = "Customer"
            } else if (currentAdminExists()) {
                username = getCurrentAdmin()!
                roleName = "Admin"
            }
            if (username) {
                const user = (await dispatch(fetchUserResponse(username))).payload
                if (user && typeof user !== "string") {
                    dispatch(addUser({
                        ...user,
                        roleName,
                    }))
                }
            }
            if (roleName === "Customer") {
                await dispatch(fetchUserCart())
                await dispatch(fetchCartProducts())
                await dispatch(fetchProductsToCart())
            }
        }
        getData()
        setLoading(false)
    }, [dispatch])

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className={cl.layout}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}
