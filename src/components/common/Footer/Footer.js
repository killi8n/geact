import React from 'react'
import classnames from 'classnames/bind'
import styles from './Footer.scss'
import Button from 'components/common/Button'

const cx = classnames.bind(styles)

const Footer = ({ logout }) => {
    return (
        <div className={cx('Footer')}>
            <div className={cx('Buttons')}>
                <Button theme="outline">Search User</Button>
                <div className={cx('space')} />
                <Button theme="outline">My Repos</Button>
                <div className={cx('space')} />
                <Button theme="outline" onClick={logout}>
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Footer
