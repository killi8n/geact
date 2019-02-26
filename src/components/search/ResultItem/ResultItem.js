import React from 'react'
import classnames from 'classnames/bind'
import styles from './ResultItem.scss'

const cx = classnames.bind(styles)

const ResultItem = ({ item }) => {
    return (
        <a target="blank_" href={item.html_url} className={cx('ResultItem')}>
            <img src={item.avatar_url} alt="thumbnail" />
            <div className={cx('right-result-item')}>{item.login}</div>
        </a>
    )
}

export default ResultItem
