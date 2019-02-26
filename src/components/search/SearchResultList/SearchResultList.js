import React from 'react'
import classnames from 'classnames/bind'
import styles from './SearchResultList.scss'
import ResultItem from 'components/search/ResultItem'

const cx = classnames.bind(styles)

const SearchResultList = ({ list }) => {
    const resultList = list.map(item => (
        <ResultItem item={item} key={item.id} />
    ))
    return <div className={cx('SearchResultList')}>{resultList}</div>
}

export default SearchResultList
