import cl from "./Cart.module.css"
import { CartTotal } from "./CartTotal/CartTotal"
import { CartLength } from "./CartLength/CartLength"
import { CartItems } from "./CartItems/CartItems"
import { useModalsState } from "../../hooks/useStateHooks/useModalsState"
import { BaseModal } from "../../UI/modals/BaseModal"
import { Button } from "../../UI/buttons/Button"
import { useCartState } from "../../hooks/useStateHooks/useCartState"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Cart = () => {

    const { isCart, setCartModalState } = useModalsState()
    const { cartLength } = useCartState()
    const navigate = useNavigate()

    const goToOrderPage = () => {
        setCartModalState(false)
        navigate("/order")
    }

    useEffect(() => {
        if (cartLength === 0) {
            setCartModalState(false)
        }
    }, [cartLength, setCartModalState])

    return (
        <BaseModal
            isVisible={isCart}
            setModalState={setCartModalState}
            title="Cart"
        >
            <div className={cl.cart}>
                <CartLength />
                <CartItems />
                <CartTotal />
                <div className={cl.cart__checkout}>
                    <Button onClick={goToOrderPage}>CHECKOUT CART</Button>
                </div>
            </div>
        </BaseModal>
    )
}