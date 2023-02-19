import { Product } from "../../components/Product/Product"
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
                        id={index + 1}
                        key={product.sku}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                    />,
                )}
            </div>
        </div>
    )
}
