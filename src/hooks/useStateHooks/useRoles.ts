import { useAppSelector } from "../useRedux"

export const useRoles = () => {
    const roles = useAppSelector(state => state.roles.roles)
    const isRolesLoading = useAppSelector(state => state.roles.isLoading)
    const rolesError = useAppSelector(state => state.roles.error)
    const rolesState = useAppSelector(state => state.roles)
    return {
        roles,
        isRolesLoading,
        rolesError,
        rolesState
    }
}
