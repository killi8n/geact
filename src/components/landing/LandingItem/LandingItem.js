import React from 'react'
import classnames from 'classnames/bind'
import styles from './LandingItem.scss'

const cx = classnames.bind(styles)

const LandingItem = ({ item, category }) => {
    if (category === 'repo') {
        return (
            <div className={cx('LandingItem')}>
                <img src={item.owner.avatar_url} alt="profile avatar" />
                <div className={cx('description')}>
                    {item.full_name.length > 30
                        ? `${item.full_name.substring(0, 29)}...`
                        : item.full_name}
                </div>
            </div>
        )
    }

    if (category === 'gist') {
        return (
            <div className={cx('LandingItem')}>
                <img src={item.owner.avatar_url} alt="profile avatar" />
                <div className={cx('description')}>
                    {item.owner.login}/
                    {Object.keys(item.files)[0].length > 30
                        ? `${Object.keys(item.files)[0].substring(0, 29)}...`
                        : Object.keys(item.files)[0]}
                </div>
            </div>
        )
    }

    if (category === 'user') {
        return (
            <div className={cx('LandingItem')}>
                <img src={item.avatar_url} alt="profile avatar" />
                <div className={cx('description')}>
                    {item.login > 30
                        ? `${item.login.substring(0, 29)}...`
                        : item.login}
                </div>
            </div>
        )
    }

    return null
}

export default LandingItem
