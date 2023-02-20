import { useUser } from "../../../hooks/useStateHooks/useUser"
import { Link } from "react-router-dom"
import { IoPersonOutline } from "react-icons/io5"
import { memo } from "react"

export const ProfileIcon = memo(() => {

    const { user } = useUser()

    return (
        <>
            <li>
                <Link to="/profile">
                    <IoPersonOutline />
                </Link>
                <span>{user?.username}</span>
            </li>
        </>
    )
})