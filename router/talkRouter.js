const Router = require('koa-router')
const Talk = require('../model/talk')
const Comment = require('../model/comment')
const User = require('../model/user')
const Postclass = require('../model/postclass')
const mongoose = require('mongoose')
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
// $route PUT /api/talks/category/:id
// @desc 修改贴子分类
talkRouter.put('/category/:id', async (ctx) => {
  const user = await  Postclass.findByIdAndUpdate(ctx.params.id, ctx.request.body)
  if (!user) {
    ctx.body = { meta: { msg: "该分类不存在", status: 404 }, data: user }
    return;
  }
  ctx.body = { meta: { msg: "修改分类成功", status: 200 }, data: user }
})

// $route GET /api/talks/category
// @desc 查看所有贴子分类
talkRouter.get('/category', async (ctx) => {
  const res = await Postclass.find()
  ctx.body = { meta: { msg: "获取成功", status: 200 }, data: res }
})
// $route GET /api/talks/category:id
// @desc 获取指定分类
talkRouter.get('/category/:id', async (ctx) => {
  const res = await Postclass.findById(ctx.params.id)
  ctx.body = { meta: { msg: "获取成功", status: 200 }, data: res }
})
// $route DELET /api/talks/category:id
// @desc 删除指定分类
talkRouter.delete('/category/:id', async (ctx) => {
  const user = await Postclass.findByIdAndRemove(ctx.params.id)
  if (!user) {
    ctx.body = { meta: { msg: "分类不存在", status: 404 }, data: user }
    return;
  }
  ctx.body = { meta: { msg: "删除成功", status: 204 }, data: user }
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

  let pagesize = ctx.query.pagesize ||   6
  let pagenumber = ctx.query.pagenumber || 1
  const user = await Talk.
  aggregate([{$sort:{date:-1}},{$skip:pagesize * (pagenumber - 1)},{$limit:pagesize*1},{ $lookup: { from: 'postclasses', localField: 'cId', foreignField: '_id', as: 'class' } },{ $lookup: { from: 'users', localField: 'uId', foreignField: '_id', as: 'user' } },{$project: {cId: 0,uId:0,__v:0}} ])
  // .skip(pagesize * (pagenumber - 1)).limit(pagesize*1).
  ctx.body = { meta: { msg: "ok", count:user.length, status: 200 }, data: user }
})

// $route GET /api/talks/categorys/:id
// @desc 获取分类贴子列表
talkRouter.get('/categorys/:id', async (ctx) => {
  let fenx = ctx.params.id
  let pagesize = ctx.query.pagesize ||   6
  let pagenumber = ctx.query.pagenumber || 1
  const user = await Talk.
  aggregate([{$match: {"cId": mongoose.Types.ObjectId(ctx.params.id)}},{$skip:pagesize * (pagenumber - 1)},{$limit:pagesize*1},{ $lookup: { from: 'users', localField: 'uId', foreignField: '_id', as: 'users' } },{$sort:{date:-1}} ]) 
  ctx.body = { meta: { msg: "ok", count:user.length, status: 200 }, data: user }
})

// $route GET /api/talks/:id
// @desc 获取贴贴子详情
talkRouter.get('/:id', async (ctx) => {
  let xId =   ctx.params.id
  let talk = await Talk
  . aggregate([{$match: {"_id": mongoose.Types.ObjectId(xId)}},{ $lookup: { from: 'users', localField: 'uId', foreignField: '_id', as: 'users' } } ]);
  let comment = await Comment
  . aggregate([{$match: {"tId": mongoose.Types.ObjectId(xId)}},{$match: {"commentType": "comment"}},{ $lookup: { from: 'users', localField: 'uId', foreignField: '_id', as: 'users' } },{$sort:{date:-1}} ]);
  let reply = await Comment
  . aggregate([{$match: {"tId": mongoose.Types.ObjectId(xId)}},{$match: {"commentType": "reply"}},{ $lookup: { from: 'users', localField: 'uId', foreignField: '_id', as: 'users' } } ]);
    
    ctx.body = { meta: { msg: "ok",  status: 200 }, data: {talk,comment,reply}}
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