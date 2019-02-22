import React from 'react'
import classnames from 'classnames/bind'
import styles from './LoginButton.scss'

const cx = classnames.bind(styles)

const LoginButton = ({ onClick }) => {
    return (
        <div className={cx('LoginButton')}>
            <div className={cx('github-button')} onClick={onClick}>
                LOGIN with Github
            </div>
        </div>
    )
}

export default LoginButton
