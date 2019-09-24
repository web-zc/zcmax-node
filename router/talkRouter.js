const Router = require('koa-router')
const Talk = require('../model/talk')
const Postclass = require('../model/postclass')
// 前缀
const talkRouter = new Router({ prefix: '/talks' })
// $route POST /api/talks/category
// @desc 添加分类
talkRouter.post('/category', async (ctx) => {
  try {
    ctx.verifyParams({
      category: { type: 'string', required: true },
    })
  }
  catch (err) {
    return ctx.body = { meta: { msg: "参数错误", status: 400 }, data: err }
  }
  const res = await new Postclass(ctx.request.body).save()
  ctx.body = { meta: { msg: "添加成功", status: 200 }, data: res }
})
// $route GET /api/talks/category
// @desc 查看所有贴子分类
talkRouter.get('/category', async (ctx) => {
  const res = await Postclass.find()
  ctx.body = { meta: { msg: "获取成功", status: 200 }, data: res }
})
// $route POST /api/talks/:uid/category/:cid
// @desc 用户添加帖子
talkRouter.post('/:uid/category/:cid', async (ctx) => {
  const uId = ctx.params.uid 
  const cId = ctx.params.cid
  const user3 = ctx.request.body
  const res = await new Talk({uId,cId,...user3}).save()
  ctx.body = { meta: { msg: "ok", status: 200 },data: res  }
})
// $route GET /api/talks
// @desc 获取贴子列表
talkRouter.get('/', async (ctx) => {

  let pagesize = ctx.query.pagesize ||   0
  let pagenumber = ctx.query.pagenumber || 1
  const count = await Talk.find()
  const user = await Talk.find().skip(pagesize * (pagenumber - 1)).limit(pagesize*1)
  ctx.body = { meta: { msg: "ok", count:count.length, status: 200 }, data: user }
})

// $route DELETE /api/talks/:id
// @desc 删除贴子
talkRouter.delete('/:id', async (ctx) => {
  const user = await Talk.findByIdAndRemove(ctx.params.id)
  if (!user) {
    ctx.body = { meta: { msg: "贴子不存在", status: 404 }, data: user }
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
// $route GET /api/talks/search
// @desc  根据内容搜索贴子 分页
talkRouter.get('/search', async (ctx) => {
  let pagesize = ctx.query.pagesize ||   0
  let pagenumber = ctx.query.pagenumber || 1
  const user = await Talk.find({content:new RegExp(ctx.query.content,'g')}).skip(pagesize * (pagenumber - 1)).limit(pagesize*1)
  
  ctx.body = { meta: { msg: "ok", status: 200 }, data: user }
})
module.exports = talkRouter.routes()