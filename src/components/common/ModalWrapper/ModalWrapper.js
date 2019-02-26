import React from 'react'
import classnames from 'classnames/bind'
import styles from './ModalWrapper.scss'

const cx = classnames.bind(styles)

const ModalWrapper = ({ visible, children }) => {
    return (
        <div className={cx('ModalWrapper', visible && 'visible')}>
            {children}
        </div>
    )
}

export default ModalWrapper
