import { useAppDispatch } from "../../../hooks/useRedux"
import { useUser } from "../../../hooks/useStateHooks/useUser"
import { adminLogout, userLogout } from "../../../services/authService"
import { logoutUser } from "../../../store/slices/userSlice"
import { IoExitOutline } from "react-icons/io5"
import React, { memo } from "react"

export const Logout = memo(() => {
    const { user } = useUser()
    const dispatch = useAppDispatch()
    const logout = () => {
        user?.roleName === "Admin" ? adminLogout() : userLogout()
        dispatch(logoutUser())
    }

    return (
        <li onClick={logout}>
            <IoExitOutline />
        </li>
    )
})