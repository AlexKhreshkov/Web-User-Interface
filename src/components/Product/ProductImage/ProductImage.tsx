import cl from "../Product.module.css"
import { memo } from "react"

interface ProductImageProps {
    image?: string | File
}

export const ProductImage = memo(({ image }: ProductImageProps) => {
    return (
        <div className={cl.product__image}>
            <img src="https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png" alt="img" />
        </div>
    )
})