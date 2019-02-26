import React from 'react'
import classnames from 'classnames/bind'
import styles from './Item.scss'

const cx = classnames.bind(styles)

const Item = ({ category, item }) => {
    if (category === 'repo') {
        return (
            <a target="blank_" href={item.html_url} className={cx('Item')}>
                <img src={item.owner.avatar_url} alt="thumbnail" />
                <div className={cx('description-more')}>
                    {item.full_name.length > 40
                        ? `${item.full_name.substring(0, 40)}...`
                        : item.full_name}
                </div>
            </a>
        )
    }
    if (category === 'user') {
        return (
            <a target="blank_" href={item.html_url} className={cx('Item')}>
                <img src={item.avatar_url} alt="thumbnail" />
                <div className={cx('description-more')}>
                    {item.login.length > 40
                        ? `${item.login.substring(0, 40)}...`
                        : item.login}
                </div>
            </a>
        )
    }

    if (category === 'gist') {
        return (
            <a target="blank_" href={item.html_url} className={cx('Item')}>
                <img src={item.owner.avatar_url} alt="thumbnail" />
                <div className={cx('description-more')}>
                    {Object.keys(item.files)[0].length > 40
                        ? `${Object.keys(item.files)[0].substring(0, 40)}...`
                        : Object.keys(item.files)[0]}
                </div>
            </a>
        )
    }
    return null
}

export default Item
