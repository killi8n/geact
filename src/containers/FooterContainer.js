import React, { Component } from 'react'
import { connect } from 'react-redux'
import Footer from 'components/common/Footer'
import { withRouter } from 'react-router-dom'

class FooterContainer extends Component {
    logout = () => {
        localStorage.removeItem('access_token')
        this.props.history.push('/login')
    }

    link = ({ path }) => {
        this.props.history.push(path)
    }

    render() {
        return <Footer logout={this.logout} link={this.link} />
    }
}

export default withRouter(
    connect(
        () => ({}),
        dispatch => ({})
    )(FooterContainer)
)
