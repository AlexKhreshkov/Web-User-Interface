import React from 'react'
import cl from './Container.module.css'

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
