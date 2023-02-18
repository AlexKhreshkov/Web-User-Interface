import cl from "./Header.module.css"
import { CartIcon } from "./CartIcon/CartIcon"
import { ProfileIcon } from "./ProfileIcon/ProfileIcon"
import { Logo } from "./Logo/Logo"
import { MenuToggle } from "./MenuToggle/MenuToggle"
import { LoginInButton } from "./LoginInButton/LoginInButton"
import { Logout } from "./Logout/Logout"
import { Container } from "../Containers/Container"
import { useUser } from "../../hooks/useStateHooks/useUser"
import React, { useState } from "react"

export const Header = () => {

    const [isToggle, setToggle] = useState(false)
    const handleToggle = () => setToggle(isToggle => !isToggle)
    const { user } = useUser()

    return (
        <div className={cl.header__container}>
            <Container>
                <div className={cl.header}>
                    <Logo />
                    <MenuToggle onClick={handleToggle} />
                    <ul
                        onClick={() => setToggle(false)}
                        className={
                            isToggle
                                ?
                                `${cl.header__linksToggle}`
                                :
                                `${cl.header__links}`
                        }
                    >
                        <CartIcon />
                        {user
                            ?
                            <>
                                <ProfileIcon />
                                <Logout />
                            </>
                            :
                            <LoginInButton />
                        }
                    </ul>
                </div>
            </Container>
        </div>
    )
}
