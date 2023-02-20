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
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        let roleName: Roles
        let username = ""
        if (currentUserExists()) {
            username = getCurrentUser()!
            roleName = "Customer"
        } else if (currentAdminExists()) {
            username = getCurrentAdmin()!
            roleName = "Admin"
        }
        if (username) {
            dispatch(fetchUserResponse(username))
                .then(userResponse => userResponse.payload)
                .then(user => {
                    if (user && typeof user !== "string") {
                        dispatch(addUser({
                            ...user,
                            roleName,
                        }))
                    }
                })
                .then(() => dispatch(fetchUserCart())
                    .then(() => dispatch(fetchCartProducts()))
                    .then(() => dispatch(fetchProductsToCart())))
                .then(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [])

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className={cl.layout}>
            <Header />
            <Outlet />
            <div style={{ flex: " 1 1 auto", visibility: "hidden" }}>
                CONTENT TO PRESS FOOTER DURING ANY PAGE IS LOADING
            </div>
            <Footer />
        </div>
    )
}
