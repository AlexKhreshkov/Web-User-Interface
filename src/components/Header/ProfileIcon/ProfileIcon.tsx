import React, { memo } from 'react'
import { IoExitOutline, IoPersonOutline } from "react-icons/io5"
import { Link } from "react-router-dom"

export const ProfileIcon = memo(() => {

    return (
        <>
            <li>
                <Link to="/">
                    <IoPersonOutline />
                </Link>
            </li>
            {/* <li>{username}</li>
            <li onClick={logout}><IoExitOutline /></li> */}
        </>
    )
})