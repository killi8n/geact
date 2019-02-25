import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import parseLinkHeader from 'parse-link-header'
import { userActions } from 'store/modules/user'
import { repoActions } from 'store/modules/repo'
import { gistActions } from 'store/modules/gist'
import { getScrollBottom } from 'lib/common'
import Title from 'components/more/Title'
import Spinner from 'components/common/Spinner'
import ItemList from 'components/more/ItemList'
import LoadMoreButton from 'components/more/LoadMoreButton'
import BottomSpinner from 'components/common/BottomSpinner'

class MorePageContainer extends Component {
    state = {
        loadMoreCount: 0,
    }

    componentDidMount() {
        if (window.shouldCancel) return
        const { category } = this.props
        if (category === 'repo') {
            this.getRepo({ since: null })
        }

        if (category === 'user') {
            this.getUser({ since: null })
        }

        if (category === 'gist') {
            this.getGist({ page: 1 })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.loadMoreCount !== this.state.loadMoreCount) {
            if (this.state.loadMoreCount >= 3) {
                this.addListeners()
            }
        }
    }

    componentWillUnmount() {
        if (this.state.loadMoreCount >= 3) {
            this.removeListeners()
        }

        if (this.props.category === 'repo') {
            if (this.props.repos.repos.length !== 0) {
                this.initializeRepo()
            }
        }

        if (this.props.category === 'user') {
            if (this.props.users.users.length !== 0) {
                this.initializeUser()
            }
        }

        if (this.props.category === 'gist') {
            if (this.props.gists.gists.length !== 0) {
                this.initializeGist()
            }
        }
    }

    getRepo = async ({ since }) => {
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

    getUser = async ({ since }) => {
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

    getGist = async ({ page }) => {
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

    addListeners = () => {
        if (window) {
            window.addEventListener('scroll', this.detectBottomOfScreen)
        }
        if (document && document.body) {
            document.body.addEventListener('scroll', this.detectBottomOfScreen)
        }
    }

    removeListeners = () => {
        if (window) {
            window.removeEventListener('scroll', this.detectBottomOfScreen)
        }
        if (document && document.body) {
            document.body.removeEventListener(
                'scroll',
                this.detectBottomOfScreen
            )
        }
    }

    detectBottomOfScreen = () => {
        const remainedBottomSize = getScrollBottom()
        if (remainedBottomSize < 200) {
            if (this.props.loading) return
            // todo: load more
            this.loadMore()
        }
    }

    handleClickLoadMore = () => {
        this.setState({
            ...this.state,
            loadMoreCount: this.state.loadMoreCount + 1,
        })
        this.loadMore()
    }

    loadMore = () => {
        const { category } = this.props

        if (category === 'repo') {
            const { repos } = this.props
            const { link } = repos
            const parsed = parseLinkHeader(link)
            const { next } = parsed
            if (!next) {
                return
            }
            const { since } = next
            this.getRepo({ since })
            return
        }

        if (category === 'user') {
            const { users } = this.props
            const { link } = users
            const parsed = parseLinkHeader(link)
            const { next } = parsed
            if (!next) return
            const { since } = next
            this.getUser({ since })
            return
        }

        if (category === 'gist') {
            const { gists } = this.props
            const { link } = gists
            const parsed = parseLinkHeader(link)
            const { next } = parsed
            if (!next) return
            const { page } = next
            this.getGist({ page })
            return
        }
    }

    render() {
        const { category, repos, users, gists } = this.props
        if (category === 'repo' && repos.repos.length === 0) return <Spinner />
        if (category === 'user' && users.users.length === 0) return <Spinner />
        if (category === 'gist' && gists.gists.length === 0) return <Spinner />
        const { handleClickLoadMore } = this
        return (
            <>
                <Title title={category} />
                <ItemList
                    category={category}
                    list={
                        category === 'repo'
                            ? repos.repos
                            : category === 'user'
                            ? users.users
                            : gists.gists
                    }
                />
                {this.state.loadMoreCount < 3 && (
                    <LoadMoreButton onClick={handleClickLoadMore} />
                )}
                {this.props.loading && <BottomSpinner />}
            </>
        )
    }
}

export default connect(
    ({ repo, user, gist, pender }) => ({
        repos: repo.allRepos,
        users: user.allUsers,
        gists: gist.allGists,
        loading:
            pender.pending['repo/GET_RECENT_REPOS'] ||
            pender.pending['user/GET_ALL_USERS'] ||
            pender.pending['gist/GET_ALL_GISTS'],
    }),
    dispatch => ({
        RepoActions: bindActionCreators(repoActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
        GistActions: bindActionCreators(gistActions, dispatch),
    })
)(MorePageContainer)
