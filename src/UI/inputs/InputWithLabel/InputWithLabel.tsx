import cl from "./InputWithLabel.module.css"
import React from "react"

interface InputWithLableProps {
    label: string
    children: React.ReactNode
}
export const InputWithLable = (props: InputWithLableProps) => {
    const { label, children } = props

    return (
        <label className={cl.label}>
            <div className={cl.labelInner}>
                {label}
            </div>
            {children}
        </label>
    )
}
