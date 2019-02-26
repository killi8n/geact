import React from 'react'
import LoginContainer from 'containers/LoginContainer'
import { Helmet } from 'react-helmet'

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <title>GEACT - LOGIN PAGE</title>
            </Helmet>
            <LoginContainer />
        </>
    )
}

export default LoginPage
