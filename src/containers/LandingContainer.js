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
import { withRouter } from 'react-router-dom'

class LandingContainer extends Component {
    componentDidMount() {
        if (window.shouldCancel) return
        this.getAllRepos({ since: null })
        this.getAllGists({ page: 1 })
        this.getAllUsers({ since: null })
    }

    getAllRepos = async ({ since }) => {
        const { RepoActions, allRepos } = this.props
        if (allRepos.visibleRepos.length > 0) return
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
        const { GistActions, allGists } = this.props
        if (allGists.visibleGists.length > 0) return
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
        const { UserActions, allUsers } = this.props
        if (allUsers.visibleUsers.length > 0) return
        try {
            await UserActions.getAllUsers({
                since,
                accessToken: localStorage.getItem('access_token'),
            })
        } catch (e) {
            console.log(e)
        }
    }

    linkToMore = ({ category }) => {
        const { history } = this.props
        history.push(`/more/${category}`)
    }

    render() {
        if (
            this.props.allRepos.visibleRepos.length === 0 ||
            this.props.allGists.visibleGists.length === 0 ||
            this.props.allUsers.visibleUsers.length === 0
        )
            return <Spinner />
        const { linkToMore } = this
        return (
            <>
                <LineWrapper>
                    <Title
                        title="All Repo List"
                        linkToMore={linkToMore}
                        category="repo"
                    />
                    <LandingLine
                        list={this.props.allRepos.visibleRepos}
                        category="repo"
                    />
                </LineWrapper>
                <LineWrapper>
                    <Title
                        title="All Gist List"
                        linkToMore={linkToMore}
                        category="gist"
                    />
                    <LandingLine
                        list={this.props.allGists.visibleGists}
                        category="gist"
                        linkToMore={linkToMore}
                    />
                </LineWrapper>
                <LineWrapper>
                    <Title
                        title="All User List"
                        linkToMore={linkToMore}
                        category="user"
                    />
                    <LandingLine
                        list={this.props.allUsers.visibleUsers}
                        category="user"
                        linkToMore={linkToMore}
                    />
                </LineWrapper>
            </>
        )
    }
}

export default withRouter(
    connect(
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
)
