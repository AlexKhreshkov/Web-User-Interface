import { useCartState } from "../../../hooks/useStateHooks/useCartState"
import { CartItem } from "../CartItem/CartItem"
import cl from "../Cart.module.css"

export const CartItems = () => {

    const { cartProducts } = useCartState()
    
    return (
        <div className={cl.cart__items}>
            {cartProducts.map((cartProduct, index) =>
                <CartItem
                    key={cartProduct.id}
                    cart_itemId={cartProduct.id}
                    index={index + 1}
                    name={cartProduct.name}
                    quantity={cartProduct.quantity}
                    price={cartProduct.price}
                />,
            )}
        </div>
    )
}
