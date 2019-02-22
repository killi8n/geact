import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from 'components/common/Spinner'
import { bindActionCreators } from 'redux'
import { repoActions } from 'store/modules/repo'
import MyPageWrapper from 'components/mypage/MyPageWrapper'
import Profile from 'components/mypage/Profile'
import RepoList from 'components/mypage/RepoList'
import { baseActions } from 'store/modules/base'
import Pagination from 'components/common/Pagination'

class MyPageContainer extends Component {
    componentDidMount() {
        if (!this.props.user) {
            this.checkLogged()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user !== this.props.user) {
            if (this.props.userRepo.repos.length > 0) return
            this.getUserRepo({ page: 1 })
        }
    }

    checkLogged = async () => {
        const { BaseActions } = this.props
        try {
            await BaseActions.checkLogged({
                accessToken: localStorage.getItem('access_token'),
            })
        } catch (e) {
            console.log(e)
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
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        if (!this.props.user || this.props.userRepo.repos.length === 0)
            return <Spinner />
        return (
            <MyPageWrapper>
                <Profile user={this.props.user} />
                <RepoList repos={this.props.userRepo.repos} />
                {this.props.userRepo.link && (
                    <Pagination
                        link={this.props.userRepo.link}
                        getUserRepo={this.getUserRepo}
                    />
                )}
            </MyPageWrapper>
        )
    }
}

export default connect(
    ({ base, repo }) => ({
        user: base.user,
        userRepo: repo.userRepo,
    }),
    dispatch => ({
        RepoActions: bindActionCreators(repoActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch),
    })
)(MyPageContainer)
