import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { repoActions } from 'store/modules/repo'
import { baseActions } from 'store/modules/base'
import Profile from 'components/mypage/Profile'
import RepoList from 'components/mypage/RepoList'
import Pagination from 'components/common/Pagination'
import Spinner from 'components/common/Spinner'
import parseLinkHeader from 'parse-link-header'
import { Helmet } from 'react-helmet'

class MyPageContainer extends Component {
    componentDidMount() {
        if (window.shouldCancel) return
        this.getDataProcess()
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.user !== this.props.user) {
    //         if (this.props.userRepo.repos.length > 0) return
    //         this.getUserRepo({ page: this.props.page })
    //     }
    // }

    getDataProcess = async () => {
        await this.getUserInfo()
        await this.getUserRepo({ page: this.props.page })
    }

    getUserInfo = async () => {
        const { BaseActions } = this.props

        try {
            await BaseActions.checkLogged({
                accessToken: localStorage.getItem('access_token'),
            })
        } catch (e) {
            console.log(e)
            localStorage.clear()
            this.props.history.push('/login')
        }
    }

    getUserRepo = async ({ page }) => {
        const { RepoActions } = this.props
        try {
            await RepoActions.getUserRepo({
                username: this.props.user.login,
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
        const parsed = parseLinkHeader(this.props.userRepo.link)
        return (
            <>
                <Helmet>
                    <title>
                        {`GEACT - MYPAGE ${parsed.next.page - 1} / ${
                            parsed.last.page
                        }`}
                    </title>
                </Helmet>
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
        ({ repo, base }) => ({
            userRepo: repo.userRepo,
            user: base.user,
        }),
        dispatch => ({
            RepoActions: bindActionCreators(repoActions, dispatch),
            BaseActions: bindActionCreators(baseActions, dispatch),
        })
    )(MyPageContainer)
)
