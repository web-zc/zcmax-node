const mongoose = require('mongoose')
const { Schema, model } = mongoose
// 点赞表
const  replySchema = new Schema({
  uId: { // 点赞用户id
    type: Schema.Types.ObjectId,
    required: true
  },
  xxId: { // 对应评论与回复评论id
    type: Schema.Types.ObjectId,
    required: true
  },
  status:{ // 点赞状态
    type: String,
    enum: ['0', '1'], default: '0', required: true
  }

},{versionKey:false})
// 生成模型
module.exports = mo = model('postclass', replySchema)