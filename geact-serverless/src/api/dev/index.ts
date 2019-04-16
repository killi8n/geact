import Router from 'koa-router';
import * as devCtrl from './dev.ctrl';

const router = new Router();

router.get('/ping', devCtrl.ping);

export default router;
