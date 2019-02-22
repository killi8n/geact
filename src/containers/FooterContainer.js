import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from 'components/common/Footer'
import { withRouter } from 'react-router-dom'

class FooterContainer extends Component {
    logout = () => {
        localStorage.removeItem('access_token')
        this.props.history.push('/login')
    }

    render() {
        return <Footer logout={this.logout} />
    }
}

export default withRouter(
    connect(
        () => ({}),
        dispatch => ({})
    )(FooterContainer)
)
