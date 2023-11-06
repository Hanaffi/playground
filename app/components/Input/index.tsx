import React, { useId } from 'react'
import styles from './Input.module.scss'
import cx from 'classnames';


type Props = React.HTMLProps<HTMLInputElement> & {
    Icon?: React.ReactElement,
    error?: string;
}

function Input({ Icon, className, ...props }: Props) {
    const inputId = useId()
    
    
    return <div className={styles.inputWrapper}>
        <div className={styles.row}>
            {props.label ? <label htmlFor={inputId} className={styles.label}>{props.label}</label> : null}
            {props.error ? <p className={styles.error}>{props.error} </p> : null}
        </div>
    
        <div className='inputWrapper'>
            {Icon ? React.cloneElement(Icon, { className: styles.icon }) : null}

            <input
                id={inputId}
                className={cx(styles.input, className)}
                {...props}
            />
        </div>
    </div>

}
export default Input