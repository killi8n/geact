import React from 'react'
import LandingItem from 'components/landing/LandingItem'
import classnames from 'classnames/bind'
import styles from './LandingLine.scss'

const cx = classnames.bind(styles)

const LandingLine = ({ list, category }) => {
    const landingList = list.map((item, index) => (
        <LandingItem key={index} item={item} category={category} />
    ))
    return <div className={cx('LandingLine')}>{landingList}</div>
}

export default LandingLine
