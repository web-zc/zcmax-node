const mongoose = require('mongoose')
const {Schema, model} = mongoose
// userSchema
const userSchema = new Schema({
  talkId: { // 讨论id
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar_url: { //头像
    type: String,
  },
  gender: { // 性别，枚举
    type: String,
    enum: ['male', 'fmale'], default: 'male', required: true
  },
  personal:{ // 个人简介
    type: String
  }

})
// 生成模型
module.exports = mo = model('User',userSchema)
