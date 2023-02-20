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
import { useCartState } from "../../hooks/useStateHooks/useCartState"
import { Loader } from "../../UI/loaders/Loader"
import { Button } from "../../UI/buttons/Button"
import { GoToAdminPageBtn } from "../GoToAdminPageBtn/GoToAdminPageBtn"
import { useState } from "react"

export const Header = () => {

    const [isToggle, setToggle] = useState(false)
    const { user, isUserLoading } = useUser()
    const { isCartLoading } = useCartState()
    const { isLoginModal, isSignUpModal, isCart } = useModalsState()
    const handleToggle = () => setToggle(isToggle => !isToggle)

    const isLoading = isUserLoading || isCartLoading

    return (
        <div className={cl.header__container}>
            <Container>
                {isLoading && <Loader />}
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
                                {user.roleName === "Admin" && <GoToAdminPageBtn />}
                                {user.roleName === "Customer" && <CartIcon />}
                                {user.roleName === "Customer" && <ProfileIcon />}
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
