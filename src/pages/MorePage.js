import React from 'react'
import Structure from 'components/common/Structure'
import MorePageContainer from 'containers/MorePageContainer'

const MorePage = ({ match }) => {
    const { category } = match.params
    return (
        <Structure>
            <MorePageContainer category={category} />
        </Structure>
    )
}

export default MorePage
