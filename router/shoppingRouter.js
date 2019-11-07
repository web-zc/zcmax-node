const Router = require('koa-router')
const Shopping = require('../model/shopping')
const shoppingRouter = new Router({ prefix: '/shopping' })


// $route post /api/shopping/cart
// @desc 加入购物车

shoppingRouter.post('/cart', async ctx=>{
    const sid = ctx.request.body.sid
    const sid2 = await Shopping.find({"sid":sid})
    if(sid2.length==0){
        const res = await new Shopping(ctx.request.body).save()
        ctx.body = {meta:{msg:'ok',status:200},data:res}
        return;
    }else{
        ctx.body = {meta:{msg:"商品已在购物车",status:201}}
    }
})

// $route post /api/shopping/carts
// @desc 购物车详情页面

shoppingRouter.get('/carts/:uid', async ctx =>{
    // let pagesize = ctx.query.pagesize ||   6
    // let pagenumber = ctx.query.pagenumber || 1
    // {$skip:pagesize * (pagenumber - 1)},{$limit:pagesize*1}
    const res = await Shopping.aggregate([{$lookup:{from:"goods",localField:"sid",foreignField:"_id",as:"items"}},{$project: {cId: 0,uId:0,__v:0}}])
    let arr =[]
    for(let i =0 ; i < res.length;i++){
        if(!res[i].items.length == 0){
            arr.push(res[i].items)
        }
    }
    ctx.body = {meta:{msg:'ok',status:200},data:res}
})

// $route post /api/shopping/carts
// @desc 删除购物车

shoppingRouter.delete('/carts/:uid/:id',async ctx=>{
    const res = await Shopping.findByIdAndRemove(ctx.params.id)
    const res2 = await Shopping.findByIdAndRemove(ctx.params.uid)
    if (!res) {
        ctx.body = { meta: { msg: "商品没得", status: 404 }, data: res }
        return;
      }
    ctx.body ={meta :{msg:"ok",status:200},data:res}
})
module.exports = shoppingRouter.routes()