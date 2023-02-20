import { setLoginModal, setSignUpModal, setCartModal } from "../../store/slices/modalsSlice"
import { useAppDispatch, useAppSelector } from "../useRedux"

export const useModalsState = () => {
    const modalsState = useAppSelector(state => state.modals)
    const dispatch = useAppDispatch()

    const isLoginModal = modalsState.isLoginModal
    const isSignUpModal = modalsState.isSignUpModal
    const isCart = modalsState.isCart

    const setLoginModallState = (value: boolean) => dispatch(setLoginModal(value))
    const setSignUpModalState = (value: boolean) => dispatch(setSignUpModal(value))
    const setCartModalState = (value: boolean) => dispatch(setCartModal(value))

    return {
        isLoginModal,
        setLoginModallState,

        isSignUpModal,
        setSignUpModalState,

        isCart,
        setCartModalState,
    }
}
