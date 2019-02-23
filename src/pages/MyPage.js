import React from 'react'
import Structure from 'components/common/Structure'
import MyPageContainer from 'containers/MyPageContainer'

const MyPage = ({ location }) => {
    let page = location.search.split('?page=')[1]
    if (!page) {
        page = 1
    }
    return (
        <Structure>
            <MyPageContainer page={page} />
        </Structure>
    )
}

export default MyPage
