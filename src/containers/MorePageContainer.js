import React, { Component } from 'react'
import { connect } from 'react-redux'
import Title from 'components/more/Title'

function mapStateToProps(state) {
    return {}
}

class MorePageContainer extends Component {
    render() {
        return (
            <>
                <Title title={this.props.category} />
            </>
        )
    }
}

export default connect(mapStateToProps)(MorePageContainer)
