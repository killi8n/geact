import { createAction, handleActions } from 'redux-actions'
import produce from 'immer'
import { applyPenders } from 'redux-pender'

const CHANGE_INPUT = 'search/CHANGE_INPUT'
const INITIALIZE = 'search/INITIALIZE'

export const searchActions = {
    changeInput: createAction(CHANGE_INPUT, payload => payload),
    initialize: createAction(INITIALIZE),
}

const initialState = {
    searchInput: '',
}

const reducer = handleActions(
    {
        [CHANGE_INPUT]: (state, action) => {
            return produce(state, draft => {
                draft.searchInput = action.payload.value
            })
        },
        [INITIALIZE]: (state, action) => initialState,
    },
    initialState
)

export default applyPenders(reducer, [])
