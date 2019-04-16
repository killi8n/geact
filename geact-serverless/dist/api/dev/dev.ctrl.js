"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = (ctx) => {
    ctx.body = process.env.NODE_ENV;
    ctx.status = 200;
};
