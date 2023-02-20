import cl from "./AdminActions.module.css"
import { OrdersView } from "./OrdersView/OrdersView"
import { ProductsView } from "./ProductsView/ProductsView"

export const AdminActions = () => {

    return (
        <div className={cl.adminActions}>
            <ProductsView />
            <OrdersView />
        </div>
    )
}
