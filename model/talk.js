const mongoose = require('mongoose')
const { Schema, model } = mongoose
// 贴子表
const talkSchema = new Schema({
  uId: { // 发表贴子的用户id
    type: Schema.Types.ObjectId,
    required: true
  },
  cId: {// 分类id
    type: Schema.Types.ObjectId,
    required: true
  },
  img: { // 配图
    type: [{ type: String }]
  },
  content: {
    type: String,
    required: true
  },
  date:{ // 创建时间
    type:Number,
    default: Date.now
  }
},{versionKey:false})
// 生成模型
module.exports = mo = model('Talk', talkSchema)
