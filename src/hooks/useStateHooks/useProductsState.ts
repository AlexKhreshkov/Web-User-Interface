import { useAppSelector } from "../useRedux"

export const useProductsState = () => {

    const products = useAppSelector(state => state.product.products)
    const isProductsLoading = useAppSelector(state => state.product.isLoading)
    const productsError = useAppSelector(state => state.product.error)

    return {
        products,
        isProductsLoading,
        productsError,
    }
}
