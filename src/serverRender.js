import React from 'react'
import axios from 'axios'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter, matchPath } from 'react-router-dom'
import configure from './store/configure'
import App from './components/App'
import routeConfig from './routeConfig'
import { Helmet } from 'react-helmet'

const serverRender = async ctx => {
    const { url, origin } = ctx
    const accessToken = ctx.cookies.get('access_token')
    const user = JSON.parse(ctx.cookies.get('user'))
    const { login } = user

    const store = configure()
    const promises = []

    axios.defaults.baseURL = origin

    routeConfig.forEach(route => {
        const match = matchPath(url.split('?')[0], route)
        if (!match) return
        const { preload } = route
        if (!preload) return
        const { params } = match

        const promise =
            url.split('?')[0] === '/mypage'
                ? preload(
                      store,
                      params,
                      accessToken,
                      login,
                      url.split('?page=')[1]
                  )
                : preload(store, params, accessToken)
        promises.push(promise)
    })

    let error = null

    try {
        await Promise.all(promises)
    } catch (e) {
        error = e
        console.log(e)
    }

    let context = {}

    const html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    )

    if (context.isNotFound) {
        ctx.status = 404
    }

    const helmet = Helmet.renderStatic()

    return {
        html,
        state: store.getState(),
        error,
        helmet,
    }
}

export default serverRender
