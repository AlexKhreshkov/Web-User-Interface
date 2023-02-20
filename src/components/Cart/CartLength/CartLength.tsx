import { useCartState } from "../../../hooks/useStateHooks/useCartState"
import cl from "../Cart.module.css"
import { memo } from "react"

export const CartLength = memo(() => {

    const { cartLength } = useCartState()

    return (
        <div className={cl.cart__count}>
            Items: {cartLength}
        </div>
    )
})