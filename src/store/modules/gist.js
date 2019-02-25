import { createAction, handleActions } from 'redux-actions'
import * as gistAPI from 'lib/api/gist'
import { applyPenders } from 'redux-pender'
import produce from 'immer'

const GET_ALL_GISTS = 'gist/GET_ALL_GISTS'
const INITIALIZE_MORE = 'gist/INITIALIZE_MORE'

export const gistActions = {
    getAllGists: createAction(GET_ALL_GISTS, gistAPI.getAllGists),
    initializeMore: createAction(INITIALIZE_MORE, payload => payload),
}

const initialState = {
    allGists: {
        visibleGists: [],
        link: null,
        gists: [],
    },
}

const reducer = handleActions(
    {
        [INITIALIZE_MORE]: (state, action) => {
            return produce(state, draft => {
                draft.allGists.gists = []
            })
        },
    },
    initialState
)

export default applyPenders(reducer, [
    {
        type: GET_ALL_GISTS,
        onSuccess: (state, action) => {
            return produce(state, draft => {
                const { data: gists, headers } = action.payload
                draft.allGists.visibleGists = gists.splice(0, 8)
                draft.allGists.gists = state.allGists.gists.concat(gists)
                draft.allGists.link = headers.link
            })
        },
    },
])
