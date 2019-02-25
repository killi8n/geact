const fs = require('fs')
const path = require('path')
const render = require('./index').default
const manifest = require('../../build/asset-manifest.json')
const reactIndex = path.join(__dirname, '../../build/index.html')
const indexHtml = fs.readFileSync(reactIndex, { encoding: 'utf8' })

function buildHtml({ html, state, error }) {
    const jsKeys = Object.keys(manifest)
        .filter(jsKey => jsKey.match(/.js$/))
        .map(key => {
            if (key === 'service-worker.js') return
            return `<script src="${manifest[key]}"></script>`
        })
        .join('\n\t\t')

    const cssKeys = Object.keys(manifest)
        .filter(cssKey => cssKey.match(/.css$/))
        .map(key => {
            return `<link href="${manifest[key]}" rel="stylesheet">`
        })
        .join('\n\t\t')

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        <title>React App</title>
        ${cssKeys}
    </head>
    <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">${html}</div>
        <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(state)};
            window.shouldCancel = true;
        </script>
       ${jsKeys}
    </body>
    </html>
    `
}

module.exports = async ctx => {
    try {
        if (ctx.request.access_token) {
            const rendered = await render(ctx)
            ctx.body = buildHtml(rendered)
            return
        }

        ctx.body = indexHtml
    } catch (e) {
        console.log('errr!', e)
        ctx.body = buildHtml({})
    }
}
