import React from 'react'
import { Wave } from 'better-react-spinkit'
import classnames from 'classnames/bind'
import styles from './Spinner.scss'

const cx = classnames.bind(styles)

const Spinner = () => {
    return (
        <div className={cx('SpinnerWrapper')}>
            <Wave size={40} color="white" />
        </div>
    )
}

export default Spinner
