const Router = require('koa-router')
const User = require('../model/user')
// 前缀
const userRouter = new Router({prefix: '/users'})
// $route GET /api/users/test
// @desc 返回json
// @access public
userRouter.get('/test', async (ctx) => {
  ctx.body = {testf:'ok'}
})
// $route POST /api/users/register
// @desc 注册用户
userRouter.post('/register', async(ctx)=>{
  ctx.verifyParams({
    name: {type: 'string', required: true},
    password: {type: 'string', required: true}
  }) 
  const {name} = ctx.request.body
  const reuser = await User.findOne({name:name})
  if(reuser){
    ctx.throw(409, '用户名重复')
  }
  const user = await new User(ctx.request.body).save()
  ctx.body = user

})
// $route POST /api/users/login
// @desc  登陆用户
userRouter.post('/login', async(ctx)=>{
  ctx.verifyParams({
    name: {type: 'string', required: true},
    password: {type: 'string', required: true}
  }) 

  const user = await User.findOne(ctx.request.body)
  if(!user){
    ctx.throw(401, '用户名或密码错误')
  }
  ctx.body = '登陆成功'
})
// $route GET /api/users/
// @desc  获取用户列表
userRouter.get('/', async(ctx)=>{
  const reuser = await User.find()
  ctx.body= reuser
})
// $route GET /api/users/:id
// @desc  获取指定用户用户
userRouter.get('/:id', async(ctx)=>{
 const user = await User.findById(ctx.params.id)
   if(!user){
     ctx.throw(404, '用户不存在');
     return;
   }
   ctx.body = user
}) 
// $route PUT /api/users/:id
// @desc  编辑用户
userRouter.put('/:id', async(ctx)=>{
  const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) {
      ctx.throw(404, '用户不存在');
      return;
    }
    ctx.body = user
}) 
// $route DElETE /api/users/:id
// @desc  删除用户
userRouter.delete('/:id', async(ctx)=>{
  const user = await User.findByIdAndRemove(ctx.params.id)
  if (!user) {
    ctx.throw(404, '用户不存在');
    return;
  }
  ctx.status = 204
}) 
module.exports = userRouter.routes()