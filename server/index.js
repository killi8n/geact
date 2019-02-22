import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

const app = new Koa()
const router = new Router()

app.use(bodyParser())

app.use(router.routes()).use(router.allowedMethods())

app.listen(4000, () => {
    console.log('App is running on port 4000')
})
