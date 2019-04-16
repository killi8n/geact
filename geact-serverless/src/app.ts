import Koa from 'koa';
import Router from 'koa-router';
import morgan from 'koa-morgan';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import path from 'path';
// import cors from '@koa/cors';
import apiRouter from './api';
import { accessTokenMiddleware } from './lib/accessToken';
import ssr from './ssr/render';

const cors = require('@koa/cors');
const app = new Koa();
const router = new Router();

const buildPath = path.join(__dirname, './build');

router.use('/api', apiRouter.routes());
router.get('/', ssr);

app.use(cors());
app.use(bodyParser());
app.use(accessTokenMiddleware);
app.use(morgan('dev'));
app.use(router.routes()).use(router.allowedMethods());
app.use(serve(buildPath));
app.use(ssr);

export default app;
