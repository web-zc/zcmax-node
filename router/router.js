const Router = require('koa-router')
const userRouter = require('./userRouter')
const talkRouter = require('./talkRouter')
var router = new Router()
// /api/user/:id
router.use('/api', userRouter);
router.use('/api', talkRouter);
module.exports = router