import { useAppSelector } from "../useRedux"

export const useCartState = () => {

    const cart = useAppSelector(state => state.cart.cart)
    const cart_products = useAppSelector(state => state.cart.cart_product)
    const cartProducts = useAppSelector(state => state.cart.cartProducts)
    const cartLength = useAppSelector(state => state.cart.cart_product).length
    const isCartLoading = useAppSelector(state => state.cart.isLoading)
    const error = useAppSelector(state => state.cart.error)
    const cartRoot = useAppSelector(state => state.cart)

    return {
        cart,
        cart_products,
        cartProducts,
        cartLength,
        isCartLoading,
        error,
        cartRoot,
    }
}
