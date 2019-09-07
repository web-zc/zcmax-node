const mongoose = require('mongoose')
const { Schema, model } = mongoose
// 评论
const commentSchema = new Schema({
  comm: {
    type: [{
      content: { type: String }, // 评论内容
      tiem: { type: Date }, // 专业
      userId: {type:Schema.Types.ObjectId}, // 评论用户
    }]
  }



})
// 生成模型
module.exports = mo = model('Comment', commentSchema)
