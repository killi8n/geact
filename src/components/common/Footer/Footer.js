import React from 'react'
import classnames from 'classnames/bind'
import styles from './Footer.scss'
import Button from 'components/common/Button'

const cx = classnames.bind(styles)

const Footer = ({ logout, link, openSearchModal }) => {
    return (
        <div className={cx('Footer')}>
            <div className={cx('Buttons')}>
                <Button theme="outline" onClick={() => link({ path: '/' })}>
                    Home
                </Button>
                <div className={cx('space')} />
                <Button theme="outline" onClick={openSearchModal}>
                    Search User
                </Button>
                <div className={cx('space')} />
                <Button
                    theme="outline"
                    onClick={() => link({ path: '/mypage?page=1' })}
                >
                    My Repos
                </Button>
                <div className={cx('space')} />
                <Button theme="outline" onClick={logout}>
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Footer
