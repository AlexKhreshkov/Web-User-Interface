import cl from "../Cart.module.css"
import { useCartState } from "../../../hooks/useStateHooks/useCartState"
import { memo } from "react"

export const CartTotal = memo(() => {

    const { cart } = useCartState()

    return (
        <div className={cl.cart__total}>
            Total: <span>{cart?.total_cost}$</span>
        </div>
    )
})