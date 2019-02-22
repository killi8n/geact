import * as authAPI from 'lib/api/auth'
import { createAction, handleActions } from 'redux-actions'
import { applyPenders } from 'redux-pender'
import produce from 'immer'

const CHECK_LOGGED = 'base/CHECK_LOGGED'

export const baseActions = {
    checkLogged: createAction(CHECK_LOGGED, authAPI.checkLogged),
}

const initialState = {
    logged: false,
    user: null,
}

const reducer = handleActions({}, initialState)

export default applyPenders(reducer, [
    {
        type: CHECK_LOGGED,
        onSuccess: (state, action) => {
            return produce(state, draft => {
                const { data: user } = action.payload
                draft.user = user
                draft.logged = true
            })
        },
    },
])
