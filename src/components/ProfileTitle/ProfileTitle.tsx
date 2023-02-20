import { useUser } from "../../hooks/useStateHooks/useUser"
import { memo } from "react"

export const ProfileTitle = memo(() => {

    const { user } = useUser()

    return (
        <div>Welcome, {user?.username}</div>
    )
})