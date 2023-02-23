import { ProductsViewThead } from "./ProductsViewThead"
import { ProductView } from "./ProductView"
import { ProductViewChanging } from "./ProductViewChanging"
import cl from "../AdminActions.module.css"
import { useProductsState } from "../../../hooks/useStateHooks/useProductsState"
import {  useState } from "react"

export const ProductsView = () => {

    const { products } = useProductsState()
    const [isChanging, setChanging] = useState(false)

    const toggleChanging = () => setChanging(!isChanging)

    return (
        <div>
            <div className={cl.action__header}>
                <div>Products</div>
                <div className={cl.action__add}>Add</div>
            </div>
            <table className={cl.table}>
                <ProductsViewThead />
                {isChanging
                    ?
                    <tbody>
                        {products.map((product, index) =>
                            <ProductViewChanging
                                key={product.sku}
                                index={index}
                                product={product}
                                toggleChanging={toggleChanging}
                            />,
                        )}
                    </tbody>
                    :
                    <tbody>
                        {products.map((product, index) =>
                            <ProductView
                                key={product.sku}
                                index={index}
                                product={product}
                                toggleChanging={toggleChanging}
                            />,
                        )}
                    </tbody>
                }

            </table>
        </div>
    )
}
