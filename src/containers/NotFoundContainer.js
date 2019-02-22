import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import NotFound from 'components/common/NotFound'

class NotFoundContainer extends Component {
    goBack = () => {
        this.props.history.goBack()
    }
    render() {
        return <NotFound goBack={this.goBack} />
    }
}

export default withRouter(connect()(NotFoundContainer))
