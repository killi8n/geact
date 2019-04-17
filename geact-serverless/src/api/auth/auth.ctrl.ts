import { Context } from 'koa';
import Joi from 'joi';
import axios from 'axios';

export const login = async (ctx: Context) => {
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
        const domain =
            process.env.NODE_ENV === 'development'
                ? 'localhost'
                : process.env.REACT_APP_CLOUD_FRONT_URL;

        ctx.cookies.set('user', JSON.stringify(user), {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            domain,
        });
        const { access_token } = response.data;
        ctx.cookies.set('access_token', access_token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
            domain,
        });
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
    const domain =
        process.env.NODE_ENV === 'development'
            ? 'localhost'
            : process.env.REACT_APP_CLOUD_FRONT_URL;

    ctx.cookies.set('user', '', {
        maxAge: 0,
        domain,
    });
    ctx.cookies.set('access_token', '', {
        maxAge: 0,
        domain,
    });
    ctx.status = 204;
};
