import cl from "./ProfileTitle.module.css"
import { useUser } from "../../hooks/useStateHooks/useUser"
import { memo } from "react"

export const ProfileTitle = memo(() => {

    const { user } = useUser()

    return (
        <div className={cl.profileTitle}>Welcome, {user?.username}</div>
    )
})