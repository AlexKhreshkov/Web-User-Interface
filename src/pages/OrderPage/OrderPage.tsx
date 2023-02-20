import cl from "./OrderPage.module.css"
import { OrderForm } from "../../components/OrderForm/OrderForm"
import { OrderTitle } from "../../components/OrderTitle/OrderTitle"

export const OrderPage = () => {
    return (
        <div className={cl.order}>
            <OrderTitle />
            <OrderForm />
        </div>
    )
}
