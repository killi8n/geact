import React from 'react'
import Structure from 'components/common/Structure'
import MorePageContainer from 'containers/MorePageContainer'
import { Helmet } from 'react-helmet'

const MorePage = ({ match }) => {
    const { category } = match.params
    return (
        <>
            <Helmet>
                <title>GEACT - MORE PAGE</title>
            </Helmet>
            <Structure>
                <MorePageContainer category={category} />
            </Structure>
        </>
    )
}

export default MorePage
