import { Context } from 'koa';
import axios from 'axios';
const manifest = require('../manifest.json');
const render = require('./index').default;

type BuildHtmlPayload = {
    html?: string;
    state?: any;
    error?: any;
    helmet?: any;
};

const buildHtml = async ({ html, state, error, helmet }: BuildHtmlPayload) => {
    try {
        const { title } = helmet;
        const jsKeys = Object.keys(manifest)
            .filter(jsKey => jsKey.match(/.js$/))
            .map(key => {
                if (key === 'service-worker.js') return;
                return `<script src="${manifest[key]}"></script>`;
            })
            .join('\n\t\t');

        const cssKeys = Object.keys(manifest)
            .filter(cssKey => cssKey.match(/.css$/))
            .map(key => {
                return `<link href="${manifest[key]}" rel="stylesheet">`;
            })
            .join('\n\t\t');

        return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="shortcut icon" href="./favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="https://d308ayjj1uqpre.cloudfront.net/build/manifest.json" />
        ${title.toString()}
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
    `;
    } catch (e) {}
};

const getIndexHTML = async () => {
    try {
        const result = await axios.get(manifest['index.html']);
        return result.data;
    } catch (e) {
        throw new Error(e);
    }
};

export default async (ctx: Context) => {
    try {
        const rendered = await render(ctx);
        // console.log(rendered);
        ctx.body = await buildHtml(rendered as any);
        // if ((ctx.request as any).access_token) {
        //     const rendered = await render(ctx);
        //     ctx.body = await buildHtml(rendered as any);
        //     return;
        // }
        // ctx.body = await getIndexHTML();
    } catch (e) {
        console.log('errr!', e);
        ctx.body = await buildHtml({});
    }
};
