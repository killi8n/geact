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
const joi_1 = __importDefault(require("joi"));
const axios_1 = __importDefault(require("axios"));
exports.login = (ctx) => __awaiter(this, void 0, void 0, function* () {
    console.log('login');
    const schema = joi_1.default.object().keys({
        code: joi_1.default.string().required(),
        client_id: joi_1.default.string().required(),
        client_secret: joi_1.default.string().required(),
    });
    const result = joi_1.default.validate(ctx.request.body, schema);
    if (result.error) {
        ctx.status = 400;
        return;
    }
    try {
        const response = yield axios_1.default.post(`https://github.com/login/oauth/access_token`, ctx.request.body, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        const checkUserResponse = yield axios_1.default.get(`https://api.github.com/user`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `bearer ${response.data.access_token}`,
            },
        });
        const { data: user } = checkUserResponse;
        ctx.cookies.set('user', JSON.stringify(user), {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            domain: process.env.NODE_ENV === 'development'
                ? 'localhost'
                : 'd98ks68zad15n.cloudfront.net',
        });
        const { access_token } = response.data;
        ctx.cookies.set('access_token', access_token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            domain: process.env.NODE_ENV === 'development'
                ? 'localhost'
                : 'd98ks68zad15n.cloudfront.net',
        });
        ctx.body = {
            accessToken: response.data.access_token,
            user,
        };
        ctx.status = 200;
    }
    catch (e) {
        console.log(e);
    }
});
exports.logout = (ctx) => {
    ctx.cookies.set('user', undefined);
    ctx.cookies.set('access_token', undefined);
    ctx.status = 204;
};
