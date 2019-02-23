import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from 'components/common/Spinner'
import { bindActionCreators } from 'redux'
import { repoActions } from 'store/modules/repo'
import Profile from 'components/mypage/Profile'
import RepoList from 'components/mypage/RepoList'
import { baseActions } from 'store/modules/base'
import Pagination from 'components/common/Pagination'
import { withRouter } from 'react-router-dom'

class MyPageContainer extends Component {
    componentDidMount() {
        if (this.props.user) {
            this.getUserRepo({ page: this.props.page })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user !== this.props.user) {
            if (this.props.userRepo.repos.length > 0) return
            this.getUserRepo({ page: this.props.page })
        }
    }

    getUserRepo = async ({ page }) => {
        const { RepoActions, user } = this.props

        try {
            await RepoActions.getUserRepo({
                username: user.login,
                page,
                accessToken: localStorage.getItem('access_token'),
            })
            this.props.history.push(`/mypage?page=${page}`)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        if (!this.props.user || this.props.userRepo.repos.length === 0)
            return <Spinner />
        return (
            <>
                <Profile user={this.props.user} />
                <RepoList repos={this.props.userRepo.repos} />
                {this.props.userRepo.link && (
                    <Pagination
                        link={this.props.userRepo.link}
                        getUserRepo={this.getUserRepo}
                    />
                )}
            </>
        )
    }
}

export default withRouter(
    connect(
        ({ base, repo }) => ({
            user: base.user,
            userRepo: repo.userRepo,
        }),
        dispatch => ({
            RepoActions: bindActionCreators(repoActions, dispatch),
            BaseActions: bindActionCreators(baseActions, dispatch),
        })
    )(MyPageContainer)
)
