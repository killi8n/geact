import React from 'react'
import OAuthContainer from 'containers/OAuthContainer'

const OAuthPage = ({ history }) => {
    const code = history.location.search.split('?code=')[1]
    return <OAuthContainer code={code} />
}

export default OAuthPage
