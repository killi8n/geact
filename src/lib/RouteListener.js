import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class RouteListener extends Component {
    componentDidMount() {
        const { history } = this.props
        this.unlisten = history.listen(this.handleChange)
    }

    handleChange = location => {
        console.log('Route has changed!')
        console.log(location)
        window.shouldCancel = false
    }

    componentWillUnmount() {
        this.unlisten()
    }

    render() {
        return null
    }
}

export default withRouter(RouteListener)
