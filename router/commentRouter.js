const Router = require('koa-router')
const Talk = require('../model/talk')
// const Postclass = require('../model/postclass')
const Comment = require('../model/comment')
// 前缀
const commentRouter = new Router({ prefix: '/comments' })

// $route POST /api/comments/:id
// @desc 查看该贴子下的所有评论
commentRouter.get('/:id', async (ctx) => {

  const res = await Talk.find()
  ctx.body = { meta: { msg: "获取成功", status: 200 }, data: res }
})

module.exports = commentRouter.routes()