import { Context } from 'koa';
export const accessTokenMiddleware = (ctx: Context, next: any) => {
    const accessToken = ctx.cookies.get('access_token');
    if (!accessToken) return next();

    (ctx as any).request.access_token = accessToken;
    return next();
};
