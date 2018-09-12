//models of products

//import the mongoose
const mongoose = require('mongoose');

//mongoose Schema
const Schema  = mongoose.Schema;



//createing object for Schema
const mongooseSchema  =new Schema({
           username:{
               type:String,
               required:true
           },

            imagepath:{
              type:String,
              required : true
            },
            title:
            {
              type:String,
              required:true
            },
            description:{
              type:String,
              required:true
            },
            price:
            {
              type:Number,
              required:true
            }
          });




  module.exports =    mongoose.model('addcart',mongooseSchema);
