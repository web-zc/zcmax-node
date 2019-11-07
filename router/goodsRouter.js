const Router = require('koa-router')
const Goods = require('../model/coods')
const Classification = require('../model/classification')
const goodsRouter = new Router({ prefix: '/goods' })

// $route get /api/goods/:id
// @desc 搜索商品

goodsRouter.get('/serch',async ctx =>{
    const res = await Goods.find({$or: [
        { des: {$regex: new RegExp(ctx.query.des)} },
        // {pirce:{$regex: new RegExp(ctx.query.pirce)}}
    ]})
    ctx.body={meat:{msg:'ok',status:200},data:res}
})



// $route get /api/goods/rank
// @desc 添加商品分类
goodsRouter.post('/rank',async ctx=>{
    try{
        ctx.verifyParams({
            des:{type:'string',required:true}
        })
    }
    catch(err){
        return ctx.body = { meta: { msg: "参数错误", status: 400 }, data: err }
    }
    const res = await new Classification(ctx.request.body).save()
    ctx.body = { meta: { msg: "添加成功", status: 200 }, data: res }
})

// $route PUT /api/goods/rank/:id
// @desc 修改贴子分类
goodsRouter.put('/rank/:id', async (ctx) => {
    const user = await  Classification.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) {
      ctx.body = { meta: { msg: "该分类不存在", status: 404 }, data: user }
      return;
    }
    ctx.body = { meta: { msg: "修改分类成功", status: 200 }, data: user }
  })

// $route get /api/goods/rank
// @desc 查看所有商品分类

goodsRouter.get('/rank',async ctx=>{
    const res = await Classification.find()
    ctx.body = {meta: { msg:'ok',status:200}, data:res}
})

// $route post /api/goods/good/:classid
// @desc 增加商品分类详情表

goodsRouter.post('/good/:classid', async ctx=>{
    try{
        ctx.verifyParams({
            des:{type:'string',required:true},
        })
    }
    catch(err){
        return ctx.body = {meta:{msg:'参数错误',status:400},data:err}
    }
    const res =await new Goods(ctx.request.body).save()
    ctx.body = { meta: { msg: "添加成功", status: 200 }, data: res }
})

// $route get /api/goods/good:classid
// @desc 获取商品分类详情表

goodsRouter.get('/good/:classid' , async ctx=>{
    let pagesize = ctx.query.pagesize ||   4
  let pagenumber = ctx.query.pagenumber || 1
  const res = await Goods.find({classid:ctx.params.classid}).skip(pagesize * (pagenumber - 1)).limit(pagesize*1)
  ctx.body = {meta: {msg:"ok",status:200} , data:res}
})

// $route get /api/goods/good
// @desc 获取所有商品详情表
goodsRouter.get('/good' , async ctx=>{
    const res = await Goods.aggregate([{$lookup:{from:'classifications',localField:'classid',foreignField:'_id',as:'items'}},{$project: {cId: 0,uId:0,__v:0}}])
  ctx.body = {meta: {msg:"ok",status:200} , data:res}
})

// $route get /api/goods/good/:id
// @desc 修改商品
goodsRouter.put('/good/:id',async ctx=>{
    const sp = await Goods.findByIdAndUpdate(ctx.params.id,ctx.request.body)
    if(!sp){
        ctx.body={meta:{msg:"该商品不存在",status:404},data:sp}
        return
    }
    ctx.body = {meat:{msg:"ok",status:200}, data:sp}
})

// $route delete /api/goods/:id
// @desc 删除商品分类详情表

goodsRouter.delete('/:id' ,async ctx=>{
    const res = await Goods.findByIdAndRemove(ctx.params.id)
    if (!res) {
        ctx.body = { meta: { msg: "商品不存在", status: 404 }, data: res }
        return;
      }
      ctx.body = { meta: { msg: "删除成功", status: 204 }, data: res }
})

// $route get /api/goods/:id
// @desc 获取一个商品的所有内容
goodsRouter.get('/:id', async ctx=>{
    const res = await Goods.findById(ctx.params.id)
    if(!res){
        ctx.body = await {meta :{msg:'商品不存在',status:404},data:res}
        return
    }
    ctx.body = {meta:{msg:'ok',status:200},data:res}
})

module.exports = goodsRouter.routes()