import { memo } from "react"

interface UserInfoFormLabelProps {
    text: string
}

export const UserInfoFormLabel = memo(({ text }: UserInfoFormLabelProps) => {
    return (
        <div>{text}</div>
    )
})