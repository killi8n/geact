import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { repoActions } from 'store/modules/repo'
import { gistActions } from 'store/modules/gist'
import { userActions } from 'store/modules/user'
import Spinner from 'components/common/Spinner'
import LandingLine from 'components/landing/LandingLine'
import LineWrapper from 'components/landing/LineWrapper'
import Title from 'components/landing/Title/Title'

class LandingContainer extends Component {
    componentDidMount() {
        this.getAllRepos({ since: null })
        this.getAllGists({ page: 1 })
        this.getAllUsers({ since: null })
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

    getAllGists = async ({ page }) => {
        const { GistActions } = this.props
        try {
            await GistActions.getAllGists({
                page,
                accessToken: localStorage.getItem('access_token'),
            })
        } catch (e) {
            console.log(e)
        }
    }

    getAllUsers = async ({ since }) => {
        const { UserActions } = this.props

        try {
            await UserActions.getAllUsers({
                since,
                accessToken: localStorage.getItem('access_token'),
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        if (
            this.props.allRepos.visibleRepos.length === 0 ||
            this.props.allGists.visibleGists.length === 0 ||
            this.props.allUsers.visibleUsers.length === 0
        )
            return <Spinner />
        return (
            <>
                <LineWrapper>
                    <Title title="All Repo List" />
                    <LandingLine
                        list={this.props.allRepos.visibleRepos}
                        category="repo"
                    />
                </LineWrapper>
                <LineWrapper>
                    <Title title="All Gist List" />
                    <LandingLine
                        list={this.props.allGists.visibleGists}
                        category="gist"
                    />
                </LineWrapper>
                <LineWrapper>
                    <Title title="All User List" />
                    <LandingLine
                        list={this.props.allUsers.visibleUsers}
                        category="user"
                    />
                </LineWrapper>
            </>
        )
    }
}

export default connect(
    ({ repo, gist, user }) => ({
        allRepos: repo.allRepos,
        allGists: gist.allGists,
        allUsers: user.allUsers,
    }),
    dispatch => ({
        RepoActions: bindActionCreators(repoActions, dispatch),
        GistActions: bindActionCreators(gistActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
    })
)(LandingContainer)
