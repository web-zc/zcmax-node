const mongoose = require('mongoose')
const { Schema, model } = mongoose
// 回复表
const  replySchema = new Schema({
  uId: { // 回复用户id
    type: Schema.Types.ObjectId,
    required: true
  },
  uxId: { // 被回复用户id
    type: Schema.Types.ObjectId,
    required: true
  },
  coId: { // 评论id
    type: Schema.Types.ObjectId,
    required: true
  },
  content:{ // 回复内容 
    type:  String,
    required:true
  }

})
// 生成模型
module.exports = mo = model('postclass', replySchema)