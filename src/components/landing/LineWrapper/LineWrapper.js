import React from 'react'
import classnames from 'classnames/bind'
import styles from './LineWrapper.scss'

const cx = classnames.bind(styles)

const LineWrapper = ({ children }) => {
    return <div className={cx('LineWrapper')}>{children}</div>
}

export default LineWrapper
