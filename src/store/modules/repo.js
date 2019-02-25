import { createAction, handleActions } from 'redux-actions'
import * as repoAPI from 'lib/api/repo'
import { applyPenders } from 'redux-pender'
import produce from 'immer'

const GET_RECENT_REPOS = 'repo/GET_RECENT_REPOS'
const GET_USER_REPO = 'repo/GET_USER_REPO'
const INITIALIZE_MORE = 'repo/INITIALIZE_MORE'

export const repoActions = {
    getAllRepos: createAction(GET_RECENT_REPOS, repoAPI.getAllRepos),
    getUserRepo: createAction(GET_USER_REPO, repoAPI.getUserRepo),
    initializeMore: createAction(INITIALIZE_MORE, payload => payload),
}

const initialState = {
    allRepos: {
        visibleRepos: [],
        link: null,
        repos: [],
    },
    userRepo: {
        repos: [],
        link: null,
    },
}

const reducer = handleActions(
    {
        [INITIALIZE_MORE]: (state, action) => {
            return produce(state, draft => {
                draft.allRepos.repos = []
            })
        },
    },
    initialState
)

export default applyPenders(reducer, [
    {
        type: GET_RECENT_REPOS,
        onSuccess: (state, action) => {
            return produce(state, draft => {
                const { data: recentRepos, headers } = action.payload
                const { link } = headers
                draft.allRepos.visibleRepos = recentRepos.splice(0, 8)
                draft.allRepos.repos = state.allRepos.repos.concat(recentRepos)
                draft.allRepos.link = link
            })
        },
    },
    {
        type: GET_USER_REPO,
        onSuccess: (state, action) => {
            return produce(state, draft => {
                const { data: repos, headers } = action.payload
                draft.userRepo.repos = repos
                draft.userRepo.link = headers.link
            })
        },
    },
])
