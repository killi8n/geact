import { createAction, handleActions } from 'redux-actions'
import * as gistAPI from 'lib/api/gist'
import { applyPenders } from 'redux-pender'
import produce from 'immer'

const GET_ALL_GISTS = 'gist/GET_ALL_GISTS'

export const gistActions = {
    getAllGists: createAction(GET_ALL_GISTS, gistAPI.getAllGists),
}

const initialState = {
    allGists: {
        visibleGists: [],
        link: null,
    },
}

const reducer = handleActions({}, initialState)

export default applyPenders(reducer, [
    {
        type: GET_ALL_GISTS,
        onSuccess: (state, action) => {
            return produce(state, draft => {
                const { data: gists, headers } = action.payload
                draft.allGists.visibleGists = gists.splice(0, 8)
                draft.allGists.link = headers.link
            })
        },
    },
])
