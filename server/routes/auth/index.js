import Router from 'koa-router'
import * as authCtrl from './auth.ctrl'

const router = new Router()

router.post('/login/oauth/access_token', authCtrl.login)

export default router
