import cl from "../Header.module.css"
import React, { memo } from "react"
import { Link } from "react-router-dom"

export const Logo = memo(() => {
    return (
        <Link to="/" className={cl.header__logo}>
            Shop
        </Link>
    )
})
