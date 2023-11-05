import React, { useId } from 'react'
import styles from './Input.module.scss'
import cx from 'classnames';

type Props = Omit<React.HTMLProps<HTMLInputElement> & {
    Icon?: React.ReactElement
}, "type">

function Input({ Icon, className, ...props }: Props) {
    const inputId = useId()



    return <div className={styles.inputWrapper}>
        {props.label ? <label htmlFor={inputId} className={styles.label}>{props.label}</label> : null}
    
        <div className='inputWrapper'>
            {Icon ? React.cloneElement(Icon, { className: styles.icon }) : null}

            <input
                type="number"
                id={inputId}
                className={cx(styles.input, className)}
                pattern="[0-9]*"
                {...props}
            />
        </div>
    </div>

}
export default Input