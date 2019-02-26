import React from 'react'
import classnames from 'classnames/bind'
import styles from './SearchInput.scss'

const cx = classnames.bind(styles)

const SearchInput = ({ onChangeInput, input, searchByUsername }) => {
    const handleChange = e => {
        const { value } = e.target
        onChangeInput({ value })
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            searchByUsername({ page: 1 })
        }
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
                onKeyPress={handleKeyPress}
            />
        </div>
    )
}

export default SearchInput
