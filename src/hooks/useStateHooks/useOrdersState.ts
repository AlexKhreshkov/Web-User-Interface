import { useAppSelector } from "../useRedux"

export const useOrdersState = () => {

    const orders = useAppSelector(state => state.order.orders)
    const isOrdersError = useAppSelector(state => state.order.error)
    const isOrderLoading = useAppSelector(state => state.order.isLoading)

    return {
        orders,
        isOrdersError,
        isOrderLoading,
    }
}
