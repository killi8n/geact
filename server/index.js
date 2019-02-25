import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import fs from 'fs'
import path from 'path'
import serve from 'koa-static'
import api from './routes'
import { accessTokenMiddleware } from './lib/accessToken'

const buildLocation = path.join(__dirname, '../build')
const buildIndex = path.join(__dirname, '../build/index.html')
const indexHtml = fs.readFileSync(buildIndex, { encoding: 'utf8' })

const app = new Koa()
const router = new Router()

router.use('/api', api.routes())

app.use(bodyParser())
app.use(accessTokenMiddleware)

app.use(router.routes()).use(router.allowedMethods())
app.use(serve(buildLocation))
app.use(ctx => {
    ctx.body = indexHtml
})

app.listen(4000, () => {
    console.log('App is running on port 4000')
})
