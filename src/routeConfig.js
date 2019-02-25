import { bindActionCreators } from 'redux'
import { repoActions } from './store/modules/repo'
import { userActions } from './store/modules/user'
import { gistActions } from './store/modules/gist'

export default [
    {
        exact: true,
        path: '/',
        preload: (store, params) => {
            const RepoActions = bindActionCreators(repoActions, store.dispatch)
            const UserActions = bindActionCreators(userActions, store.dispatch)
            const GistActions = bindActionCreators(gistActions, store.dispatch)
        },
    },
]
