import cl from "./AdminActions.module.css"
import { OrdersView } from "./OrdersView/OrdersView"
import { ProductsView } from "./ProductsView/ProductsView"
import { ViewTotal } from "./ViewTotal/ViewTotal"
import { useOrdersState } from "../../hooks/useStateHooks/useOrdersState"
import { useProductsState } from "../../hooks/useStateHooks/useProductsState"
import { Loader } from "../../UI/loaders/Loader"
import { useAppDispatch } from "../../hooks/useRedux"
import { fetchOrders } from "../../store/slices/orderSlice"
import { fetchProducts } from "../../store/slices/productSlice"
import { useEffect, useState } from "react"

export const AdminActions = () => {

    const { orders } = useOrdersState()
    const { products } = useProductsState()
    const [isLoading, setLoading] = useState(true)
    const dispatch = useAppDispatch()

    useEffect(() => {
        Promise.all([
            dispatch(fetchOrders()),
            dispatch(fetchProducts()),
        ]).finally(() => setLoading(false))
    }, [dispatch])

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className={cl.adminActions}>
            <ViewTotal count={products.length} name="Product" />
            {products.length > 0 ? <ProductsView /> : <div>No products found</div>}
            <ViewTotal count={orders.length} name="Order" />
            {orders.length > 0 ? <OrdersView />: <div>No orders found</div>}
        </div>
    )
}
