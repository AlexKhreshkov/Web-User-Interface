import { useAppSelector } from "../useRedux"

export const useUser = () => {

    const user = useAppSelector(state => state.user.user)
    const isUserLoading = useAppSelector(state => state.user.isLoading)
    const userError = useAppSelector(state => state.user.error)

    return {
        user,
        isUserLoading,
        userError,
    }
}
