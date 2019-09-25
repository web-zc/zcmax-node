const mongoose = require('mongoose')
const {Schema, model} = mongoose
// userSchema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: { //头像
    type: String,
  },
  gender: { // 性别，枚举
    type: String,
    enum: ['male', 'fmale'], default: 'male', required: true
  },
  personal:{ // 个人简介
    type: String
  }

},{versionKey:false})
// 生成模型
module.exports = mo = model('User',userSchema)
