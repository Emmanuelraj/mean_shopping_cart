const mongoose = require('mongoose');


const mongooseSchema=new mongoose.Schema({


    username:{
      type:String,
      required:true
    },
   password:{
     type:String,
     required:true
   },
   confirmPassword:{
     type:String,
     required:true
   },
   user:{
     type:String,
     required:true
   }

});



module.exports = mongoose.model('userregister', mongooseSchema);
