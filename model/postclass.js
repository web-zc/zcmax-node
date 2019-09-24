const mongoose = require('mongoose')
const { Schema, model } = mongoose
// 分类表
const  postclassSchema = new Schema({

  category: {// 分类
    type: String,
    required: true
  }
})
// 生成模型
module.exports = mo = model('Postclass', postclassSchema)