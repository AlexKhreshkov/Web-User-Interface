import React, { memo } from 'react'
import { IoCartOutline } from "react-icons/io5"
import cl from './CartIcon.module.css'

export const CartIcon = memo(() => {
    return (
        <li className={cl.cart}>
            <div className={cl.cart_count}>1</div>
            <IoCartOutline />
        </li>
    )
})