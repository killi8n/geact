import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { repoActions } from 'store/modules/repo'
import Spinner from 'components/common/Spinner'
import LandingLine from '../components/landing/LandingLine'

class LandingContainer extends Component {
    componentDidMount() {
        this.getAllRepos({ since: null })
    }

    getAllRepos = async ({ since }) => {
        const { RepoActions } = this.props
        try {
            await RepoActions.getAllRepos({
                since,
                accessToken: localStorage.getItem('access_token'),
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        if (this.props.allRepos.visibleRepos.length === 0) return <Spinner />
        return (
            <LandingLine
                list={this.props.allRepos.visibleRepos}
                category="repo"
            />
        )
    }
}

export default connect(
    ({ repo }) => ({
        allRepos: repo.allRepos,
    }),
    dispatch => ({
        RepoActions: bindActionCreators(repoActions, dispatch),
    })
)(LandingContainer)
