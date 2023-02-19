import cl from "../Product.module.css"
import { memo } from "react"

interface ProductPriceProps {
    price: number
}

export const ProductPrice = memo(({ price }: ProductPriceProps) => {
    return (
        <div className={cl.product__price}>
            {price}$
        </div>
    )
})