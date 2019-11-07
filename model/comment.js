const mongoose = require('mongoose')
const { Schema, model } = mongoose
// 评论表
const commentSchema = new Schema({
  uId: { // 评论用户id
    type: Schema.Types.ObjectId,
    required: true
  },
  mId:{ // 目标用户id
    type:Schema.Types.ObjectId,
  },
  tId: { // 贴子id
    type: Schema.Types.ObjectId,
    required: true
  },
  commentType:{ // 是评论还是回复
    type:String,
    enum: ['comment', 'reply'], default: 'comment',
  },
  fId:{ // 父评论id
    type:Schema.Types.ObjectId,
  },
  date:{ // 创建时间
    type:Number,
    default: Date.now
  },
  content:{ // 评论内容
    type:String,
    required: true
  },
  replys:{
    type:Array,
    default:[]
  }
},{versionKey:false})
// 生成模型
module.exports = mo = model('Comment', commentSchema)
