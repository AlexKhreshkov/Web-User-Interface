import cl from "./Container.module.css"
import React from "react"

interface IContainerProps {
    children: React.ReactNode
}

export const Container = ({ children }: IContainerProps) => {
    return (
        <div className={cl.container}>
            {children}
        </div>
    )
}
