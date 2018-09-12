const mongoose = require('mongoose');


var mongooseSchema = new mongoose.Schema({

    username:{
      type:String,
      required:true
    },
    productId:{
      type:String,
      required:true
    },
    imagepath:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    title:
      {
        type:String,
        required:true
      },
      price:{
        type:Number,
        required:true
      }
})



module.exports = mongoose.model('purchaseOrder',mongooseSchema)
