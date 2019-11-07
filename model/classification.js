const mongoose = require('mongoose')
const { Schema, model } = mongoose
// 商品分类表
const  classificationSchema = new Schema({

//   category: {// 分类
//     type: String,
//     required: true
//   },
  des:{ // 描述
    type:String,
    require:true
  }
},{versionKey:false})
// 生成模型
module.exports = mo = model('classification', classificationSchema)