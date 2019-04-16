import { Context } from 'koa';

export const ping = (ctx: Context) => {
    ctx.body = process.env.NODE_ENV;
    ctx.status = 200;
};
