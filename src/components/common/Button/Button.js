import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames/bind'
import styles from './Button.scss'

const cx = classnames.bind(styles)

const Button = ({ onClick, to, children, theme }) => {
    if (to) {
        return (
            <Link to={to} className={cx('Button', theme && theme)}>
                {children}
            </Link>
        )
    }
    return (
        <div className={cx('Button', theme && theme)} onClick={onClick}>
            {children}
        </div>
    )
}

export default Button
