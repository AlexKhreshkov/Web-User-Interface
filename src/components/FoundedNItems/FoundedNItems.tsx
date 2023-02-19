import cl from "./FoundedNItems.module.css"
import React, { memo } from "react"

interface IFoundedNItemsProps {
    count: number
    name: string
}

export const FoundedNItems = memo((props: IFoundedNItemsProps) => {

    const { count, name } = props

    const text = count === 1 ? name : `${name}s`

    return (
        <div className={cl.founded}>
            Founded: <span>{count}</span> {text}
        </div>
    )
})