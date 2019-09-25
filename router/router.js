const Router = require('koa-router')
const userRouter = require('./userRouter')
const talkRouter = require('./talkRouter')
const commentRouter = require('./commentRouter')
var router = new Router()
// /api/user/:id
router.use('/api', userRouter);
router.use('/api', talkRouter);
router.use('/api', commentRouter);
module.exports = router