import { Product } from "../Product/Product"
import { IProduct } from "../../types/IProduct"

interface ProductsListProps {
    products: IProduct[]
}

export const ProductsList = (props: ProductsListProps) => {

    const { products } = props

    if (!products.length) {
        <div>No products found</div>
    }

    return (
        <div>
            <div>
                {products.map((product, index) =>
                    <Product
                        key={product.sku}
                        index={index + 1}
                        sku={product.sku}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                    />,
                )}
            </div>
        </div>
    )
}
