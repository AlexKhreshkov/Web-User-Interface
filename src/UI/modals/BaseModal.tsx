import cl from "./BaseModal.module.css"
import { useEffect, useState } from "react"


interface BaseModallProps {
    title: string,
    isVisible: boolean
    // setModalState: React.Dispatch<React.SetStateAction<boolean>> 
    setModalState: any
    children: React.ReactNode
}

export const BaseModal = (props: BaseModallProps) => {

    const { title, isVisible, children, setModalState } = props
    const [rootClasses, setRootClasses] = useState([cl.popup])

    const closeHandler = () => {
        setRootClasses([cl.popup, cl.popupAcitve])
        setModalState(false)
    }

    const contentClickHandler = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()

    useEffect(() => {
        if (isVisible) {
            setRootClasses([cl.popup, cl.popupAcitve])
        } else {
            setRootClasses([cl.popup])
        }
    }, [isVisible])

    return (
        <div
            className={rootClasses.join(" ")}
            onClick={closeHandler}
        >
            <div
                className={cl.popup__body}
            >
                <div
                    className={cl.popup__content}
                    onClick={e => contentClickHandler(e)}
                >
                    <button
                        className={cl.popup__close}
                        onClick={closeHandler}
                    >
                        X
                    </button>
                    <div className={cl.popup__title}>{title}</div>
                    {children}
                </div>
            </div>
        </div>
    )
}
