import * as authAPI from 'lib/api/auth'
import { createAction, handleActions } from 'redux-actions'
import { applyPenders } from 'redux-pender'
import produce from 'immer'

const CHECK_LOGGED = 'base/CHECK_LOGGED'
const OPEN_MODAL = 'base/OPEN_MODAL'
const HIDE_MODAL = 'base/HIDE_MODAL'

export const baseActions = {
    checkLogged: createAction(CHECK_LOGGED, authAPI.checkLogged),
    openModal: createAction(OPEN_MODAL, payload => payload),
    hideModal: createAction(HIDE_MODAL, payload => payload),
}

const initialState = {
    user: null,
    modal: {
        search: {
            visible: false,
        },
    },
}

const reducer = handleActions(
    {
        [OPEN_MODAL]: (state, action) => {
            return produce(state, draft => {
                const { modalname } = action.payload
                draft.modal[modalname].visible = true
            })
        },
        [HIDE_MODAL]: (state, action) => {
            return produce(state, draft => {
                const { modalname } = action.payload
                draft.modal[modalname].visible = false
            })
        },
    },
    initialState
)

export default applyPenders(reducer, [
    {
        type: CHECK_LOGGED,
        onSuccess: (state, action) => {
            return produce(state, draft => {
                const { data: user } = action.payload
                draft.user = user
            })
        },
    },
])
