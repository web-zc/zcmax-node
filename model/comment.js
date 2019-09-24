const mongoose = require('mongoose')
const { Schema, model } = mongoose
// 评论表
const commentSchema = new Schema({
  uId: { // 评论用户id
    type: Schema.Types.ObjectId,
    required: true
  },
  pId: { // 贴子id
    type: Schema.Types.ObjectId,
    required: true
  },
  date:{ // 创建时间
    type:Date,
    default: Date.now
  },
  content:{ // 评论内容
    type:String,
    required: true
  }
})
// 生成模型
module.exports = mo = model('Comment', commentSchema)