import cl from "./ModalSubtitle.module.css"
import { memo } from "react"

interface ModalSubtitleProps {
    title: string
    linkText: string
    callback?: () => void
}

export const ModalSubtitle = memo((props: ModalSubtitleProps) => {
    const { title, linkText, callback } = props

    return (
        <div className={cl.subtitle}>
            {title}
            <span onClick={callback}>
                {linkText}
            </span>
        </div>
    )
})