import cl from "./CartIcon.module.css"
import React, { memo } from "react"
import { IoCartOutline } from "react-icons/io5"

export const CartIcon = memo(() => {

    const cartCount = 1

    return (
        <li className={cl.cart}>
            <div className={cl.cart_count}>{cartCount}</div>
            <IoCartOutline />
        </li>
    )
})