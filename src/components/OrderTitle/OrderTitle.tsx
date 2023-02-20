import cl from "../../pages/OrderPage/OrderPage.module.css"
import React, { memo } from "react"

export const OrderTitle = memo(() => {
    return (
        <div className={cl.order__title}>Make order</div>
    )
})
