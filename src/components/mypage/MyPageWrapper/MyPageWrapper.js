import React from 'react'
import classnames from 'classnames/bind'
import styles from './MyPageWrapper.scss'

const cx = classnames.bind(styles)

const MyPageWrapper = ({ children }) => {
    return <div className={cx('MyPageWrapper')}>{children}</div>
}

export default MyPageWrapper
