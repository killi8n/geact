import React from 'react'
import OAuthContainer from 'containers/OAuthContainer'
import { Helmet } from 'react-helmet'

const OAuthPage = ({ history }) => {
    const code = history.location.search.split('?code=')[1]
    return (
        <>
            <Helmet>
                <title>OAUTH LOADING....</title>
            </Helmet>
            <OAuthContainer code={code} />
        </>
    )
}

export default OAuthPage
