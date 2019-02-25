import React from 'react'
import classnames from 'classnames/bind'
import styles from './ItemList.scss'
import Item from 'components/more/Item'

const cx = classnames.bind(styles)

const ItemList = ({ category, list }) => {
    const itemList = list.map((item, index) => (
        <Item key={index} category={category} item={item} />
    ))
    return <div className={cx('ItemList')}>{itemList}</div>
}

export default ItemList
