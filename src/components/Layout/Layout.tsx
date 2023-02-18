import cl from "./Layout.module.css"
import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import { useUser } from "../../hooks/useStateHooks/useUser"
import { Loader } from "../../UI/loaders/Loader"
import { useAppDispatch } from "../../hooks/useRedux"
import { currentAdminExists, currentUserExists, getCurrentAdmin, getCurrentUser } from "../../services/authService"
import { fetchUserResponse } from "../../store/slices/userSlice"
import { addUser } from "../../store/slices/userSlice"
import { Roles } from "../../types/IRole"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

export const Layout = () => {

    const dispatch = useAppDispatch()
    const { isUserLoading } = useUser()

    useEffect(() => {
        let roleName: Roles
        let username = ""

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
        }
        getData()
    }, [dispatch])

    if (isUserLoading) {
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
