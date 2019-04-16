"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenMiddleware = (ctx, next) => {
    const accessToken = ctx.cookies.get('access_token');
    if (!accessToken)
        return next();
    ctx.request.access_token = accessToken;
    return next();
};
