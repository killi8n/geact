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
                    {item.full_name.length > 20
                        ? `${item.full_name.substring(0, 29)}...`
                        : item.full_name}
                </div>
            </div>
        )
    }

    return null
}

export default LandingItem
