const mongoose = require('mongoose')
const { Schema, model } = mongoose
// 商品表
const  goodsSchema = new Schema({

  classid: {// 商品分类id
    type: Schema.Types.ObjectId,
    required: true
  },
//   gid:{ //购物id
//     type:Schema.Types.ObjectId,
//     require:true
//   },
  photo:{ // 商品图片
    type:String,

  },
  pirce:{//商品价钱
    type:Number,
    required:true
  },
  des:{//商品描述
    type:String,
    required:true
  }
},{versionKey:false})
// 生成模型
module.exports = mo = model('goods', goodsSchema)