import cl from "./AddToCart.module.css"
import { useAppDispatch } from "../../hooks/useRedux"
import { fetchCartProducts, fetchProductsToCart, fetchUserCart, postProductToCart } from "../../store/slices/cartSlice"
import { useCartState } from "../../hooks/useStateHooks/useCartState"
import { IoCartOutline } from "react-icons/io5"

interface AddToCartProps {
    children: string
    sku: string
}

export const AddToCart = (props: AddToCartProps) => {
    const { sku, children } = props
    const dispatch = useAppDispatch()
    const { cart, cart_products } = useCartState()
    const cart_id = cart?.id ? cart.id : -1

    const addProductToCartHandler = () => {
        for (const product of cart_products) {
            if (product.product_sku === sku) return
        }
        dispatch(postProductToCart({
            cart_id,
            product_sku: sku,
            quantity: 1,
        }))
            //!wrong; remake it if i will have time
            .then(() => dispatch(fetchUserCart()))
            .then(() => dispatch(fetchCartProducts()))
            .then(() => dispatch(fetchProductsToCart()))
    }

    return (
        <button
            className={cl.button}
            onClick={addProductToCartHandler}
        >
            <IoCartOutline className={cl.cart_icon} />
            {children}
        </button>
    )
}
