import React, { useId, useState } from 'react'
import styles from './NumInputWithIcon.module.scss'

type Props = Omit<React.HTMLProps<HTMLInputElement> & {
    Icon: React.ReactElement
}, "type">

function NumInputWithIcon({ Icon, ...props }: Props) {
    const inputId = useId()
    const [value, setValue] = useState<number>((props.defaultValue || 0) as number)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value))
    }

    return <div className={styles.inputWrapper}>
        <label htmlFor={inputId}>{props.label}</label>
        <div className='inputWrapper'>
            {React.cloneElement(Icon, { className: styles.icon })}

            <input
                {...props}
                type="number"
                id={inputId}
                value={value}
                onChange={handleChange}
                className={styles.input}
                pattern="[0-9]*"
            />
        </div>
    </div>

}
export default NumInputWithIcon