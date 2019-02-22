import React from 'react'
import classnames from 'classnames/bind'
import styles from './NotFound.scss'
import Button from 'components/common/Button'

const cx = classnames.bind(styles)

const NotFound = ({ goBack }) => {
    return (
        <div className={cx('NotFound')}>
            <div className={cx('description')}>404 Not Found</div>
            <Button theme="outline" onClick={goBack}>
                뒤로가기
            </Button>
        </div>
    )
}

export default NotFound
