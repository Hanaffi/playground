import React, { useId } from 'react'
import styles from './Input.module.scss'
import cx from 'classnames';

type Props = React.HTMLProps<HTMLInputElement> & {
    Icon?: React.ReactElement
}

function Input({ Icon, className, ...props }: Props) {
    const inputId = useId()



    return <div className={styles.inputWrapper}>
        {props.label ? <label htmlFor={inputId} className={styles.label}>{props.label}</label> : null}
    
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