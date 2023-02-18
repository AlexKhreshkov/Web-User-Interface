import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { useAppDispatch } from "../../hooks/useRedux"
import { useRoles } from "../../hooks/useStateHooks/useRoles"
import { currentUserExists, getCurrentUser } from "../../services/authService"
import { fetchRoles } from "../../store/slices/roleSlice"
import { fetchUser } from "../../store/slices/userSlice"
import { Loader } from "../../UI/Loaders/Loader"
import { Container } from "../Containers/Container"
import { Footer } from "../Footer/Footer"
import { Header } from "../Header/Header"
import cl from './Layout.module.css'

export const Layout = () => {

    const dispatch = useAppDispatch()
    const { roles, isRolesLoading, rolesError } = useRoles()

    const [isDataLoading, setDataLoading] = useState(false)

    useEffect(() => {
        setDataLoading(true)
        const isUser = currentUserExists()
        let currentUserId: number
        if (isUser) {
            currentUserId = Number(getCurrentUser() as string)
            dispatch(fetchUser(currentUserId))
        }
        Promise.all([
            dispatch(fetchRoles())
        ])
        setDataLoading(false)
    }, [])

    if (isDataLoading) {
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
