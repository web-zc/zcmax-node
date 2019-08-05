const Router = require('koa-router')
const userRouter = require('./userRouter')
var router = new Router()
// /api/user/:id
router.use('/api', userRouter);

module.exports = router