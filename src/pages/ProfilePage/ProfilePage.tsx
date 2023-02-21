import cl from "./ProfilePage.module.css"
import { UserInfoForm } from "../../components/UserInfoForm/UserInfoForm"
import { Container } from "../../components/Containers/Container"
import { Button } from "../../UI/buttons/Button"
import { useInput } from "../../hooks/useInput"
import { MAX_EMAIL_LENGTH, MAX_LAST_NAME_LENGTH, MIN_EMAIL_LENGTH, MIN_FIRST_NAME_LENGTH, MIN_LAST_NAME_LENGTH } from "../../constants/lengthConstants"
import { useUser } from "../../hooks/useStateHooks/useUser"
import { useAppDispatch } from "../../hooks/useRedux"
import { updateUserInfo } from "../../store/slices/userSlice"
import { ProfileTitle } from "../../components/ProfileTitle/ProfileTitle"
import { GoBackButton } from "../../components/GoBackBtn/GoBackBtn"

const ProfilePage = () => {

    const { user } = useUser()
    const dispatch = useAppDispatch()

    const firstName = useInput(user?.first_name, {
        minLength: MIN_FIRST_NAME_LENGTH,
        maxLength: MAX_LAST_NAME_LENGTH,
    })
    const lastName = useInput(user?.last_name, {
        minLength: MIN_LAST_NAME_LENGTH,
        maxLength: MAX_LAST_NAME_LENGTH,
    })
    const email = useInput(user?.email, {
        minLength: MIN_EMAIL_LENGTH,
        maxLength: MAX_EMAIL_LENGTH,
    })

    const nolengthError = !(firstName.lengthError || lastName.lengthError || email.lengthError)
    const buttonState = firstName.isValid && lastName.isValid && email.isValid && nolengthError

    const updateUserInfoHanlder = () => {

        dispatch(updateUserInfo({
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
        }))

    }

    return (
        <Container>
            <div className={cl.profile}>
                <div className={cl.goBack}>
                    <GoBackButton />
                </div>
                <ProfileTitle />
                <UserInfoForm
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                />
                <Button
                    isDisabled={!buttonState}
                    onClick={updateUserInfoHanlder}>
                    UPDATE INFO
                </Button>
            </div>
        </Container>
    )
}
export default ProfilePage