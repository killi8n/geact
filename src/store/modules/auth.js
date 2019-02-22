import { handleActions, createAction } from 'redux-actions'
import * as authAPI from 'lib/api/auth'
import { applyPenders } from 'redux-pender'
import produce from 'immer'

const LOGIN = 'auth/LOGIN'

export const authActions = {
    login: createAction(LOGIN, authAPI.login),
}

const initialState = {
    logged: false,
    accessToken: null,
}

const reducer = handleActions({}, initialState)

export default applyPenders(reducer, [
    {
        type: LOGIN,
        onSuccess: (state, action) => {
            return produce(state, draft => {
                const { access_token } = action.payload.data
                draft.accessToken = access_token
                draft.logged = true
            })
        },
    },
])
