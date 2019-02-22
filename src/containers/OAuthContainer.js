import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Spinner from 'components/common/Spinner'
import { authActions } from 'store/modules/auth'

class OAuthContainer extends Component {
    componentDidMount() {
        this.login()
    }

    login = async () => {
        const { AuthActions, code } = this.props
        try {
            await AuthActions.login({
                code,
                clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
                clientSecret: process.env.REACT_APP_OAUTH_SECRET_ID,
            })
            localStorage.setItem('access_token', this.props.accessToken)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return <Spinner />
    }
}

export default connect(
    ({ auth }) => ({
        accessToken: auth.accessToken,
    }),
    dispatch => ({
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(OAuthContainer)
