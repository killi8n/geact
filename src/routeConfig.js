import { bindActionCreators } from 'redux'
import { repoActions } from './store/modules/repo'
import { userActions } from './store/modules/user'
import { gistActions } from './store/modules/gist'

export default [
    {
        exact: true,
        path: '/',
        preload: (store, params, accessToken) => {
            const RepoActions = bindActionCreators(repoActions, store.dispatch)
            const UserActions = bindActionCreators(userActions, store.dispatch)
            const GistActions = bindActionCreators(gistActions, store.dispatch)

            const repoPromise = RepoActions.getAllRepos({
                since: null,
                accessToken,
            })
            const userPromise = UserActions.getAllUsers({
                since: null,
                accessToken,
            })
            const gistPromise = GistActions.getAllGists({
                page: 1,
                accessToken,
            })

            return Promise.all([repoPromise, userPromise, gistPromise])
        },
    },
    {
        exact: true,
        path: '/login',
    },
    {
        exact: true,
        path: '/login/oauth',
    },
    {
        exact: false,
        path: '/mypage',
        // preload: (store, params, accessToken) => {
        //     const RepoActions = bindActionCreators(repoActions, store.dispatch)
        //     return RepoActions.getUserRepo({username: })
        // },
    },
    {
        exact: false,
        path: '/more/:category',
        preload: (store, params, accessToken) => {
            const { category } = params
            console.log('config params', params)
            let promises = []
            if (category === 'repo') {
                const RepoActions = bindActionCreators(
                    repoActions,
                    store.dispatch
                )
                const repoPromise = RepoActions.getAllRepos({
                    since: null,
                    accessToken,
                })

                promises.push(repoPromise)
            }

            if (category === 'user') {
                const UserActions = bindActionCreators(
                    userActions,
                    store.dispatch
                )
                const userPromise = UserActions.getAllUsers({
                    since: null,
                    accessToken,
                })
                promises.push(userPromise)
            }

            if (category === 'gist') {
                const GistActions = bindActionCreators(
                    gistActions,
                    store.dispatch
                )
                const gistPromise = GistActions.getAllGists({
                    page: 1,
                    accessToken,
                })
                promises.push(gistPromise)
            }
            return Promise.all(promises)
        },
    },
]
