import cl from "../Product.module.css"
import React from "react"

interface ProductHeaderProps {
    children: React.ReactNode
}

export const ProductHeader = ({ children }: ProductHeaderProps) => {
    return (
        <div className={cl.product__header}>
            {children}
        </div>
    )
}
