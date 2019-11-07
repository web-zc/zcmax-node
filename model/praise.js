const mongoose = require('mongoose')
const { Schema, model } = mongoose
// 点赞表
const  praiseSchema = new Schema({
  uId: { // 点赞用户id
    type: Schema.Types.ObjectId,
    required: true
  },
  tId: { // 贴子id
    type: Schema.Types.ObjectId,
  },
  pId: { // 评论id
    type: Schema.Types.ObjectId,
  },
  status:{ // 点赞状态
    type: Boolean,
    default:false
  }

},{versionKey:false})
// 生成模型
module.exports = mo = model('praise', praiseSchema)