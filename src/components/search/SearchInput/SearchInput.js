import React from 'react'
import classnames from 'classnames/bind'
import styles from './SearchInput.scss'

const cx = classnames.bind(styles)

const SearchInput = () => {
    return (
        <div className={cx('InputWrapper')}>
            <input className={cx('SearchInput')} type="text" name="search" />
        </div>
    )
}

export default SearchInput
