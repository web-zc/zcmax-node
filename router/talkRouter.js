const Router = require('koa-router')
const Talk = require('../model/talk')
// 前缀
const talkRouter = new Router({ prefix: '/talks' })
// $route POST /api/talks/:id
// @desc 用户添加帖子
talkRouter.post('/:id', async (ctx) => {
  const datax = {category:'1',content:'我是一个兵',userId:'5d7371dc6ba04610ac797b19'}
  const user = await new Talk(datax).save()
  ctx.body = { meta: { msg: "ok", status: 200 }, data: user }
})
// $route GET /api/talks
// @desc 获取贴子列表
talkRouter.get('/', async (ctx) => {
  const user = await Talk.find()
  ctx.body = { meta: { msg: "ok", status: 200 }, data: user }
})
// $route DELETE /api/talks/:id
// @desc 删除贴子
talkRouter.delete('/:id', async (ctx) => {
  const user = await Talk.findByIdAndRemove(ctx.params.id)
  if (!user) {
    ctx.body = { meta: { msg: "用户不存在", status: 404 }, data: user }
    return;
  }
  ctx.body = { meta: { msg: "删除成功", status: 204 }, data: user }
})
// $route PUT /api/talks/:id
// @desc  编辑贴子
talkRouter.put('/:id', async (ctx) => {
  const user = await Talk.findByIdAndUpdate(ctx.params.id, ctx.request.body)
  if (!user) {
    ctx.body = { meta: { msg: "用户不存在", status: 404 }, data: user }
    return;
  }
  ctx.body = { meta: { msg: "ok", status: 200 }, data: user }
})
module.exports = talkRouter.routes()