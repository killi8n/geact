import React from 'react'
import NotFoundContainer from 'containers/NotFoundContainer'

const NotFoundPage = ({ staticContext }) => {
    if (staticContext) {
        staticContext.isNotFound = true
    }
    return <NotFoundContainer />
}

export default NotFoundPage
