import cl from "./ModalGlobalError.module.css"

interface ModalGlobalErrorPorps {
    errorText: string
}

export const ModalGlobalError = ({ errorText }: ModalGlobalErrorPorps) => {
    return (
        <div className={cl.error}>
            {errorText}
        </div>
    )
}
