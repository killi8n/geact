import React from 'react'
import classnames from 'classnames/bind'
import styles from './Item.scss'

const cx = classnames.bind(styles)

const Item = ({ category, item }) => {
    if (category === 'repo') {
        return (
            <div className={cx('Item')}>
                <img src={item.owner.avatar_url} alt="thumbnail" />
                <div className={cx('description-more')}>
                    {item.full_name.length > 40
                        ? `${item.full_name.substring(0, 40)}...`
                        : item.full_name}
                </div>
            </div>
        )
    }
    if (category === 'user') {
        return (
            <div className={cx('Item')}>
                <img src={item.avatar_url} alt="thumbnail" />
                <div className={cx('description-more')}>
                    {item.login.length > 40
                        ? `${item.login.substring(0, 40)}...`
                        : item.login}
                </div>
            </div>
        )
    }

    if (category === 'gist') {
        return (
            <div className={cx('Item')}>
                <img src={item.owner.avatar_url} alt="thumbnail" />
                <div className={cx('description-more')}>
                    {Object.keys(item.files)[0].length > 40
                        ? `${Object.keys(item.files)[0].substring(0, 40)}...`
                        : Object.keys(item.files)[0]}
                </div>
            </div>
        )
    }
    return null
}

export default Item
