import React from 'react'
import NotFoundContainer from 'containers/NotFoundContainer'
import { Helmet } from 'react-helmet'

const NotFoundPage = ({ staticContext }) => {
    if (staticContext) {
        staticContext.isNotFound = true
    }
    return (
        <>
            <Helmet>
                <title>GEACT - 404 PAGE</title>
            </Helmet>
            <NotFoundContainer />
        </>
    )
}

export default NotFoundPage
