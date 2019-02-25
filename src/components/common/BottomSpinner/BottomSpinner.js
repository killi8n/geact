import React from 'react'
import { DoubleBounce } from 'better-react-spinkit'
import classnames from 'classnames/bind'
import styles from './BottomSpinner.scss'

const cx = classnames.bind(styles)

const BottomSpinner = () => {
    return (
        <div className={cx('BottomSpinner')}>
            <DoubleBounce size={30} color="white" />
        </div>
    )
}

export default BottomSpinner
