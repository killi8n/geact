import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Title from 'components/more/Title'
import Spinner from 'components/common/Spinner'
import ItemList from 'components/more/ItemList'
import { userActions } from 'store/modules/user'
import { repoActions } from 'store/modules/repo'
import { gistActions } from '../store/modules/gist'

class MorePageContainer extends Component {
    componentDidMount() {
        const { category } = this.props

        if (category === 'repo') {
            this.getRepo()
        }

        if (category === 'user') {
            this.getUser()
        }

        if (category === 'gist') {
            this.getGist()
        }
    }

    componentWillUnmount() {
        if (this.props.repos.length !== 0) {
            this.initializeRepo()
        }

        if (this.props.users.length !== 0) {
            this.initializeUser()
        }

        if (this.props.gists.length !== 0) {
            this.initializeGist()
        }
    }

    getRepo = async () => {
        const { RepoActions } = this.props

        try {
            await RepoActions.getAllRepos({
                since: null,
                accessToken: localStorage.getItem('access_token'),
            })
        } catch (e) {
            console.log(e)
        }
    }

    getUser = async () => {
        const { UserActions } = this.props

        try {
            await UserActions.getAllUsers({
                since: null,
                accessToken: localStorage.getItem('access_token'),
            })
        } catch (e) {
            console.log(e)
        }
    }

    getGist = async () => {
        const { GistActions } = this.props

        try {
            await GistActions.getAllGists({
                page: 1,
                accessToken: localStorage.getItem('access_token'),
            })
        } catch (e) {
            console.log(e)
        }
    }

    initializeRepo = () => {
        const { RepoActions } = this.props
        RepoActions.initializeMore()
    }

    initializeUser = () => {
        const { UserActions } = this.props
        UserActions.initializeMore()
    }

    initializeGist = () => {
        const { GistActions } = this.props
        GistActions.initializeMore()
    }

    render() {
        const { category, repos, users, gists } = this.props
        if (category === 'repo' && repos.length === 0) return <Spinner />
        if (category === 'user' && users.length === 0) return <Spinner />
        if (category === 'gist' && gists.length === 0) return <Spinner />
        return (
            <>
                <Title title={category} />
                <ItemList
                    category={category}
                    list={
                        category === 'repo'
                            ? repos
                            : category === 'user'
                            ? users
                            : gists
                    }
                />
            </>
        )
    }
}

export default connect(
    ({ repo, user, gist }) => ({
        repos: repo.allRepos.repos,
        users: user.allUsers.users,
        gists: gist.allGists.gists,
    }),
    dispatch => ({
        RepoActions: bindActionCreators(repoActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
        GistActions: bindActionCreators(gistActions, dispatch),
    })
)(MorePageContainer)
