import cl from "./Header.module.css"
import { CartIcon } from "./CartIcon/CartIcon"
import { ProfileIcon } from "./ProfileIcon/ProfileIcon"
import { Logo } from "./Logo/Logo"
import { MenuToggle } from "./MenuToggle/MenuToggle"
import { LoginInButton } from "./LoginInButton/LoginInButton"
import { Logout } from "./Logout/Logout"
import { Container } from "../Containers/Container"
import { useUser } from "../../hooks/useStateHooks/useUser"
import { useModalsState } from "../../hooks/useStateHooks/useModalsState"
import { Cart } from "../Cart/Cart"
import { LoginModal } from "../LoginModal/LoginModal"
import { SignUpModal } from "../SignUpModal/SignUpModal"
import { useState } from "react"

export const Header = () => {

    const [isToggle, setToggle] = useState(false)
    const { user } = useUser()
    const { isLoginModal, isSignUpModal, isCart } = useModalsState()

    const handleToggle = () => setToggle(isToggle => !isToggle)

    return (
        <div className={cl.header__container}>
            <Container>
                {isCart && <Cart />}
                {isSignUpModal && <SignUpModal />}
                {isLoginModal && <LoginModal />}
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
                        {user
                            ?
                            <>
                                <CartIcon />
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
