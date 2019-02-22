import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginButton from 'components/auth/LoginButton'

class LoginContainer extends Component {
    handleClickLogin = () => {
        window.location.replace(
            `https://github.com/login/oauth/authorize?scope=user:email&client_id=${
                process.env.REACT_APP_OAUTH_CLIENT_ID
            }`
        )
    }

    render() {
        const { handleClickLogin } = this
        return <LoginButton onClick={handleClickLogin} />
    }
}

export default connect()(LoginContainer)
