import cl from "./Product.module.css"
import { ProductContainer } from "./ProductContainer"
import { ProductDescription } from "./ProductDescription/ProductDescription"
import { ProductHeader } from "./ProductHeader/ProductHeader"
import { ProductImage } from "./ProductImage/ProductImage"
import { ProductName } from "./ProductName/ProductName"
import { ProductPrice } from "./ProductPrice/ProductPrice"

interface ProductProps {
    id?: number
    name: string
    price: number
    description: string
    image?: string | File
}

export const Product = (props: ProductProps) => {

    const { id, name, price, description, image } = props

    return (
        <ProductContainer>
            <div className={cl.product}>
                <ProductHeader>
                    <span>{id}.</span>
                    <ProductName name={name} />
                </ProductHeader>
                <ProductPrice price={price} />
                <ProductImage image={image} />
                <ProductDescription description={description} />
            </div>
        </ProductContainer>
    )
}
