import cl from "../Product.module.css"
import { memo } from "react"

interface ProductNameProps {
    name: string
}

export const ProductName = memo(({ name }: ProductNameProps) => {
    return (
        <div className={cl.product__name}>
            {name}
        </div>
    )
})