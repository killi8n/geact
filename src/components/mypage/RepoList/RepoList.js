import React from 'react'
import classnames from 'classnames/bind'
import styles from './RepoList.scss'
import RepoItem from 'components/mypage/RepoItem'

const cx = classnames.bind(styles)

const RepoList = ({ repos }) => {
    const repoList = repos.map(repo => <RepoItem key={repo.id} repo={repo} />)
    return <div className={cx('RepoList')}>{repoList}</div>
}

export default RepoList
