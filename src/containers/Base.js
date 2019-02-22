import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { baseActions } from 'store/modules/base'
import { withRouter } from 'react-router-dom'
import { authActions } from 'store/modules/auth'

class Base extends Component {
    componentDidMount() {
        this.checkLogged()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.logged !== this.props.logged) {
            if (!this.props.logged) {
                this.props.history.push('/login')
            }
        }
    }

    checkLogged = async () => {
        const { BaseActions, AuthActions } = this.props

        if (this.props.history.location.pathname === '/login/oauth') return

        try {
            if (this.props.history.location.pathname === '/login') {
                if (localStorage.getItem('access_token')) {
                    this.props.history.push('/')
                }
                return
            }

            if (localStorage.getItem('access_token')) {
                AuthActions.tempLogin()
            }
            console.log(localStorage.getItem('access_token'))

            await BaseActions.checkLogged({
                accessToken: localStorage.getItem('access_token'),
            })
        } catch (e) {
            console.log(e)
            console.log('remove localStorage')
            localStorage.removeItem('access_token')
            this.props.history.push('/login')
        }
    }

    render() {
        return null
    }
}

export default withRouter(
    connect(
        ({ auth }) => ({
            logged: auth.logged,
        }),
        dispatch => ({
            BaseActions: bindActionCreators(baseActions, dispatch),
            AuthActions: bindActionCreators(authActions, dispatch),
        })
    )(Base)
)
