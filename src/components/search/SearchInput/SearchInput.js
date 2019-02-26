import React from 'react'
import classnames from 'classnames/bind'
import styles from './SearchInput.scss'

const cx = classnames.bind(styles)

const SearchInput = ({ onChangeInput, input }) => {
    const handleChange = e => {
        const { value } = e.target
        onChangeInput({ value })
    }
    return (
        <div className={cx('InputWrapper')}>
            <input
                className={cx('SearchInput')}
                type="text"
                name="search"
                placeholder="Search By Username"
                onChange={handleChange}
                value={input}
            />
        </div>
    )
}

export default SearchInput
