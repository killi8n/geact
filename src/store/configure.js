import rootReducer from './modules'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import penderMiddleware from 'redux-pender'

const reducers = combineReducers(rootReducer)
const middlewares = [penderMiddleware()]

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const composeEnhancers = devtools || compose

const configure = preloadedState =>
    createStore(
        reducers,
        preloadedState,
        composeEnhancers(applyMiddleware(...middlewares))
    )

export default configure
