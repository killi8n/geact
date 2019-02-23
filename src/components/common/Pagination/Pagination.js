import React from 'react'
import classnames from 'classnames/bind'
import styles from './Pagination.scss'
import Button from 'components/common/Button'
import parseLinkHeader from 'parse-link-header'

const cx = classnames.bind(styles)

const Pagination = ({ link, getUserRepo }) => {
    const parsed = parseLinkHeader(link)

    return (
        <div className={cx('Pagination')}>
            <Button
                theme={parsed.prev ? 'outline' : 'disabled'}
                onClick={() => getUserRepo({ page: parsed.prev.page })}
            >
                prev
            </Button>
            <div className={cx('PageInfo')}>
                {parsed.next.page - 1} / {parsed.last.page} page
            </div>
            <div className={cx('right')}>
                <Button
                    theme={parsed.next ? 'outline' : 'disabled'}
                    onClick={() => getUserRepo({ page: parsed.next.page })}
                >
                    next
                </Button>
            </div>
        </div>
    )
}

export default Pagination
