import React from 'react'
import LandingContainer from 'containers/LandingContainer'
import Structure from 'components/common/Structure'
import { Helmet } from 'react-helmet'

const LandingPage = () => {
    return (
        <>
            {
                <Helmet>
                    <title>GEACT - LANDING PAGE</title>
                </Helmet>
            }
            <Structure>
                <LandingContainer />
            </Structure>
        </>
    )
}

export default LandingPage
