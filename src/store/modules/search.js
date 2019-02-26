import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'
import { applyPenders } from 'redux-pender'
import * as searchAPI from 'lib/api/search'

const CHANGE_INPUT = 'search/CHANGE_INPUT'
const INITIALIZE = 'search/INITIALIZE'
const SEARCH_BY_USERNAME = 'search/SEARCH_BY_USERNAME'

export const searchActions = {
    changeInput: createAction(CHANGE_INPUT, payload => payload),
    initialize: createAction(INITIALIZE),
    searchByUsername: createAction(
        SEARCH_BY_USERNAME,
        searchAPI.searchByUsername
    ),
}

const initialState = {
    searchInput: '',
    result: {
        users: null,
        link: null,
    },
}

const reducer = handleActions(
    {
        [CHANGE_INPUT]: (state, action) => {
            return produce(state, draft => {
                draft.searchInput = action.payload.value
            })
        },
        [INITIALIZE]: (state, action) => {
            return produce(state, draft => {
                draft.searchInput = ''
                draft.result = initialState.result
            })
        },
    },
    initialState
)

export default applyPenders(reducer, [
    {
        type: SEARCH_BY_USERNAME,
        onSuccess: (state, action) => {
            return produce(state, draft => {
                const { data: users, headers } = action.payload
                if (state.result.users && state.result.users.items.length > 0) {
                    draft.result.users.items = state.result.users.items.concat(
                        users.items
                    )
                    if (headers.link) {
                        draft.result.link = headers.link
                    }
                    return
                }
                draft.result.users = users
                if (headers.link) {
                    draft.result.link = headers.link
                }
            })
        },
    },
])
