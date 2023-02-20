import cl from "./Product.module.css"
import { ProductContainer } from "./ProductContainer"
import { ProductDescription } from "./ProductDescription/ProductDescription"
import { ProductHeader } from "./ProductHeader/ProductHeader"
import { ProductImage } from "./ProductImage/ProductImage"
import { ProductName } from "./ProductName/ProductName"
import { ProductPrice } from "./ProductPrice/ProductPrice"
import { AddToCart } from "../../UI/buttons/AddToCart"

interface ProductProps {
    index: number
    sku: string
    name: string
    price: number
    description: string
    image?: string | File
}

export const Product = (props: ProductProps) => {

    const { index, sku, name, price, description, image } = props

    return (
        <ProductContainer>
            <div className={cl.product}>
                <AddToCart sku={sku}>Add to cart</AddToCart>
                <ProductHeader>
                    <span>{index}.</span>
                    <ProductName name={name} />
                </ProductHeader>
                <ProductPrice price={price} />
                <ProductImage image={image} />
                <ProductDescription description={description} />
            </div>
        </ProductContainer>
    )
}
