import Router from 'koa-router';
import dev from './dev';
import auth from './auth';

const router = new Router();

router.use('/dev', dev.routes());

// if (process.env.NODE_ENV === 'development') {
//     router.use('/dev', dev.routes());
// }
router.use('/auth', auth.routes());

export default router;
