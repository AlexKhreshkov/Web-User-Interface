import React, { useState } from 'react'
import { Container } from "../Containers/Container"
import cl from './Header.module.css'
import { CartIcon } from "./CartIcon/CartIcon"
import { ProfileIcon } from "./ProfileIcon/ProfileIcon"
import { Logo } from "./Logo/Logo"
import { MenuToggle } from "./MenuToggle/MenuToggle"

export const Header = () => {

    const [isToggle, setToggle] = useState(false)
    const handleToggle = () => setToggle(isToggle => !isToggle)

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
                        <ProfileIcon />
                    </ul>
                </div>
            </Container>
        </div>
    )
}
