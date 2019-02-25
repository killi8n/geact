import React from 'react'
import classnames from 'classnames/bind'
import styles from './LoadMoreButton.scss'

const cx = classnames.bind(styles)

const LoadMoreButton = ({ onClick }) => {
    return (
        <div className={cx('LoadMoreButton')} onClick={onClick}>
            Load More
        </div>
    )
}

export default LoadMoreButton
