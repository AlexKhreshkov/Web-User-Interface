import cl from "../Product.module.css"
import { memo } from "react"

interface ProductDescriptionProps {
    description: string
}

export const ProductDescription = memo(({ description }: ProductDescriptionProps) => {
    return (
        <p className={cl.description}>
            {description}
        </p>
    )
})