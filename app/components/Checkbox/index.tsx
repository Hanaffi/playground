import styles from './Checkbox.module.scss'
import cx from 'classnames';

type Props = Omit<React.HTMLProps<HTMLInputElement> & {
    label: string
}, "type">

function Checkbox({label, className, ...inputProps}: Props) {
    
    return (<label className={styles.label}>
        <input type="checkbox" {...inputProps} className={cx(styles.input, className)} />
        <span>{label}</span>
    </label>)
}

export default Checkbox