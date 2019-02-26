import { handleActions, createAction } from 'redux-actions'
import * as authAPI from 'lib/api/auth'
import { applyPenders } from 'redux-pender'
import produce from 'immer'

const LOGIN = 'auth/LOGIN'
const TEMP_LOGIN = 'auth/TEMP_LOGIN'
const LOGOUT = 'auth/LOGOUT'

export const authActions = {
    login: createAction(LOGIN, authAPI.login),
    tempLogin: createAction(TEMP_LOGIN, payload => payload),
    logout: createAction(LOGOUT, authAPI.logout),
}

const initialState = {
    logged: false,
    accessToken: null,
    user: null,
}

const reducer = handleActions(
    {
        [TEMP_LOGIN]: (state, action) => {
            return produce(state, draft => {
                draft.logged = true
            })
        },
    },
    initialState
)

export default applyPenders(reducer, [
    {
        type: LOGIN,
        onSuccess: (state, action) => {
            return produce(state, draft => {
                const { accessToken, user } = action.payload.data
                draft.accessToken = accessToken
                draft.user = user
                draft.logged = true
            })
        },
    },
])
