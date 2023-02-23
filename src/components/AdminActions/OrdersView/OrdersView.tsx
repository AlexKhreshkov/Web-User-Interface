import { OrderView } from "./OrderView"
import cl from "../AdminActions.module.css"
import { useOrdersState } from "../../../hooks/useStateHooks/useOrdersState"
import { Loader } from "../../../UI/loaders/Loader"
import { ViewTotal } from "../ViewTotal/ViewTotal"

export const OrdersView = () => {

    const { orders, isOrderLoading } = useOrdersState()

    if (isOrderLoading) {
        return <Loader />
    }

    return (
        <div>
            <ViewTotal count={orders.length} name="Order" />
            <div className={cl.action__header}>
                <div>Orders</div>
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
