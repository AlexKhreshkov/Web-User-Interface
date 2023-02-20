import { OrderView } from "./OrderView"
import cl from "../AdminActions.module.css"
import { useOrdersState } from "../../../hooks/useStateHooks/useOrdersState"
import { useAppDispatch } from "../../../hooks/useRedux"
import { fetchOrders } from "../../../store/slices/orderSlice"
import { Loader } from "../../../UI/loaders/Loader"
import { ViewTotal } from "../ViewTotal/ViewTotal"
import { useEffect } from "react"

export const OrdersView = () => {

    const dispatch = useAppDispatch()
    const { orders, isOrderLoading } = useOrdersState()

    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    if (isOrderLoading) {
        return <Loader />
    }

    return (
        <div>
            <ViewTotal count={orders.length} name="Order" />
            <div className={cl.action__header}>
                <div>Orders</div>
                <div className={cl.action__add}>Add</div>
            </div>
            <table className={cl.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th>User id</th>
                        <th>Created</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) =>
                        <OrderView
                            key={order.id}
                            index={index}
                            order={order}
                        />,
                    )}
                </tbody>
            </table>
        </div>
    )
}
