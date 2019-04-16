import { Context } from 'koa';
import Joi from 'joi';
import axios from 'axios';

export const login = async (ctx: Context) => {
    console.log('login');
    const schema = Joi.object().keys({
        code: Joi.string().required(),
        client_id: Joi.string().required(),
        client_secret: Joi.string().required(),
    });

    const result = Joi.validate((ctx as any).request.body, schema);

    if (result.error) {
        ctx.status = 400;
        return;
    }

    try {
        const response = await axios.post(
            `https://github.com/login/oauth/access_token`,
            (ctx as any).request.body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        );

        const checkUserResponse = await axios.get(
            `https://api.github.com/user`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `bearer ${response.data.access_token}`,
                },
            }
        );

        const { data: user } = checkUserResponse;
        ctx.cookies.set('user', JSON.stringify(user));
        const { access_token } = response.data;
        ctx.cookies.set('access_token', access_token);
        ctx.body = {
            accessToken: response.data.access_token,
            user,
        };
        ctx.status = 200;
    } catch (e) {
        console.log(e);
    }
};

export const logout = (ctx: Context) => {
    ctx.cookies.set('user', undefined);
    ctx.cookies.set('access_token', undefined);
    ctx.status = 204;
};
