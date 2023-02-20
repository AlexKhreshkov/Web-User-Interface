import cl from "./CartIcon.module.css"
import { useCartState } from "../../../hooks/useStateHooks/useCartState"
import { useModalsState } from "../../../hooks/useStateHooks/useModalsState"
import { memo } from "react"
import { IoCartOutline } from "react-icons/io5"

export const CartIcon = memo(() => {

    const { cartLength } = useCartState()
    const { setCartModalState } = useModalsState()
    const openCart = () => {
        setCartModalState(true)
    }

    return (
        <li className={cl.cart} onClick={openCart}>
            <div className={cl.cart_count}>{cartLength > 0 && cartLength}</div>
            <IoCartOutline />
        </li>
    )
})