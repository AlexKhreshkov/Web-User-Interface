import cl from "./MenuToggle.module.css"

interface IMenuToggleProps {
    onClick: () => void
}

export const MenuToggle = ({ onClick }: IMenuToggleProps) => {
    return (
        <div className={cl.toggleBtn} onClick={onClick}>
            <span className={cl.bar}></span>
            <span className={cl.bar}></span>
            <span className={cl.bar}></span>
        </div>
    )
}