import Joi from 'joi'
import axios from 'axios'

export const login = async ctx => {
    const schema = Joi.object().keys({
        code: Joi.string().required(),
        client_id: Joi.string().required(),
        client_secret: Joi.string().required(),
    })

    const result = Joi.validate(ctx.request.body, schema)

    if (result.error) {
        ctx.status = 400
        return
    }

    try {
        const response = await axios.post(
            `https://github.com/login/oauth/access_token`,
            ctx.request.body
        )

        ctx.body = response.data
        ctx.status = 200
    } catch (e) {
        console.log(e)
    }
}
