import { createAction, handleActions } from 'redux-actions'
import * as userAPI from 'lib/api/user'
import { applyPenders } from 'redux-pender'
import produce from 'immer'

const GET_ALL_USERS = 'user/GET_ALL_USERS'

export const userActions = {
    getAllUsers: createAction(GET_ALL_USERS, userAPI.getAllUsers),
}

const initialState = {
    allUsers: {
        visibleUsers: [],
        link: null,
    },
}

const reducer = handleActions({}, initialState)

export default applyPenders(reducer, [
    {
        type: GET_ALL_USERS,
        onSuccess: (state, action) => {
            return produce(state, draft => {
                const { data: users, headers } = action.payload
                draft.allUsers.visibleUsers = users.splice(0, 8)
                draft.allUsers.link = headers.link
            })
        },
    },
])
