import React from 'react'
import classnames from 'classnames/bind'
import styles from './Structure.scss'
import FooterContainer from 'containers/FooterContainer'

const cx = classnames.bind(styles)

const Structure = ({ children }) => {
    return (
        <div className={cx('Structure')}>
            {children}
            <FooterContainer />
        </div>
    )
}

export default Structure
