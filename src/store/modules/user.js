import { createAction, handleActions } from 'redux-actions'
import * as userAPI from 'lib/api/user'
import { applyPenders } from 'redux-pender'
import produce from 'immer'

const GET_ALL_USERS = 'user/GET_ALL_USERS'
const INITIALIZE_MORE = 'user/INITIALIZE_MORE'

export const userActions = {
    getAllUsers: createAction(GET_ALL_USERS, userAPI.getAllUsers),
    initializeMore: createAction(INITIALIZE_MORE, payload => payload),
}

const initialState = {
    allUsers: {
        visibleUsers: [],
        link: null,
        users: [],
    },
}

const reducer = handleActions(
    {
        [INITIALIZE_MORE]: (state, action) => {
            return produce(state, draft => {
                draft.allUsers.users = []
            })
        },
    },
    initialState
)

export default applyPenders(reducer, [
    {
        type: GET_ALL_USERS,
        onSuccess: (state, action) => {
            return produce(state, draft => {
                const { data: users, headers } = action.payload
                draft.allUsers.visibleUsers = users.splice(0, 8)
                draft.allUsers.users = users
                draft.allUsers.link = headers.link
            })
        },
    },
])
