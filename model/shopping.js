const mongoose = require('mongoose')
const {Schema,model} = mongoose
//加入购物车表
const shoppingSchema = new Schema({
    sid:{//商品id
        type:Schema.Types.ObjectId,
        required:true
    },
    uid:{//用户id
        type:Schema.Types.ObjectId,
        required:true
    },
    // content:{//商品评论内容
    //     type:String,
    // },
    // date:{  //评论时间
    //     type:String,
    //     default:Date.now
    // }
})
module.exports = mo = model('shopping', shoppingSchema)