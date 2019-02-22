import { createAction, handleActions } from 'redux-actions'
import * as repoAPI from 'lib/api/repo'
import { applyPenders } from 'redux-pender'
import produce from 'immer'

const GET_RECENT_REPOS = 'repo/GET_RECENT_REPOS'

export const repoActions = {
    getAllRepos: createAction(GET_RECENT_REPOS, repoAPI.getAllRepos),
}

const initialState = {
    allRepos: {
        visibleRepos: [],
        link: null,
    },
}

const reducer = handleActions({}, initialState)

export default applyPenders(reducer, [
    {
        type: GET_RECENT_REPOS,
        onSuccess: (state, action) => {
            return produce(state, draft => {
                const { data: recentRepos, headers } = action.payload
                const { link } = headers
                draft.allRepos.visibleRepos = recentRepos.splice(0, 8)
                draft.allRepos.link = link
            })
        },
    },
])
