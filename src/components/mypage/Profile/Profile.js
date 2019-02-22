import React from 'react'
import classnames from 'classnames/bind'
import styles from './Profile.scss'

const cx = classnames.bind(styles)

const Profile = ({ user }) => {
    return (
        <div className={cx('Profile')}>
            <img src={user.avatar_url} alt="avatar url" />
            <div className={cx('right')}>
                <div className={cx('username')}>{user.login}</div>
            </div>
        </div>
    )
}

export default Profile
