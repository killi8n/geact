import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configure from 'store/configure'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import './styles/base.scss'

const rootElement = document.getElementById('root')

const store = configure(window.__PRELOADED_STATE__)

const RootComponent = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(RootComponent, rootElement)

serviceWorker.unregister()
