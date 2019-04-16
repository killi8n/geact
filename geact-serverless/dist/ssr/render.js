"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const manifest = require('../manifest.json');
const render = require('./index').default;
const buildHtml = ({ html, state, error, helmet }) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { title } = helmet;
        const jsKeys = Object.keys(manifest)
            .filter(jsKey => jsKey.match(/.js$/))
            .map(key => {
            if (key === 'service-worker.js')
                return;
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
    }
    catch (e) { }
});
const getIndexHTML = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const result = yield axios_1.default.get(manifest['index.html']);
        return result.data;
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.default = (ctx) => __awaiter(this, void 0, void 0, function* () {
    try {
        const rendered = yield render(ctx);
        // console.log(rendered);
        ctx.body = yield buildHtml(rendered);
        // if ((ctx.request as any).access_token) {
        //     const rendered = await render(ctx);
        //     ctx.body = await buildHtml(rendered as any);
        //     return;
        // }
        // ctx.body = await getIndexHTML();
    }
    catch (e) {
        console.log('errr!', e);
        ctx.body = yield buildHtml({});
    }
});
