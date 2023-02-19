import cl from "./Product.module.css"

interface ProductContainerProps {
    children: React.ReactNode
}

export const ProductContainer = ({ children }: ProductContainerProps) => {
    return (
        <div className={cl.product__container}>
            {children}
        </div>
    )
}
