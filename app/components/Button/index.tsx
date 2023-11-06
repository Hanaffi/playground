import styles from './Button.module.scss'
import cx from 'classnames'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    
}
function Button({children, className,...props}: Props) {
    
    return <button {...props} className={cx(styles.base, className)}> {children}</button>
}

export default Button