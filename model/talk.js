const mongoose = require('mongoose')
const { Schema, model } = mongoose
// 讨论
const talkSchema = new Schema({
  userId: { // 用户id
    type: Schema.Types.ObjectId,
  },
  commentId: { // 评论id
    type: Schema.Types.ObjectId,
  },
  category: {// 分类
    type: String,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8'], required: true
  },
  status: { // 状态
    type: String,
    enum: ['true', 'false',], default: 'true', required: true
  },
  img: { // 配图
    type: [{ type: String }]
  },
  content: {
    type: String,
    required: true
  },
  praise: { // 点赞状态
    type: [{ type: Schema.Types.ObjectId }],
  },


})
// 生成模型
module.exports = mo = model('Talk', talkSchema)
