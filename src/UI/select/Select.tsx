import cl from "./Select.module.css"

export interface IOption {
    value: string
    name: string
}

interface ISelectProps {
    option: IOption
    options: IOption[]
    setOption: React.Dispatch<React.SetStateAction<IOption>>
    isFullWidth?: boolean
}

export const Select: React.FC<ISelectProps> = (props) => {

    // eslint-disable-next-line prefer-const
    let { option, options, setOption, isFullWidth } = props

    options = options ? options : []
    const rootClasses = [cl.select]
    if (isFullWidth) rootClasses.push(cl.fullWidth)

    return (
        <select
            className={rootClasses.join(" ")}
            value={option.value}
            onChange={e => setOption({
                name: e.target.name,
                value: e.target.value,
            })}
        >
            {options.map(option =>
                <option
                    key={option.value}
                    value={option.value}
                >
                    {option.name}
                </option>)
            }
        </select >
    )

}
