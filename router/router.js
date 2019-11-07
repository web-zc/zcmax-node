const Router = require('koa-router')
const userRouter = require('./userRouter')
const talkRouter = require('./talkRouter')
const shoppingRouter = require('./shoppingRouter')
const goodsRouter= require('./goodsRouter')
var router = new Router()
// /api/user/:id
router.use('/api', userRouter);
router.use('/api', talkRouter);
router.use('/api', shoppingRouter);
router.use('/api', goodsRouter);
module.exports = router