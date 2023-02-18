import cl from "./Button.module.css"

interface IButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    isDisabled?: boolean
    children: string
}

export const Button = (props: IButtonProps) => {
    const { onClick, isDisabled = false, children } = props
    return (
        <button
            className={cl.button}
            onClick={onClick}
            disabled={isDisabled}
        >
            {children}
        </button>
    )
}
