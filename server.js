const express = require('express');

const bodyParser = require('body-parser');

const session = require('express-session');

const mongoose = require('mongoose');

const cors = require('cors');

const validator = require('express-validator');

const passport = require('passport');


const path = require('path');


var app  = express()


//productRoutes
const productRoutes = require('./routes/productRoutes');


 mongoose.connect('mongodb://testbible:testbible1@ds261450.mlab.com:61450/bible_cart');




var db = mongoose.connection;




db.on('err',function (err)
{
  console.log('err on db'+err);
})


db.once('connect',function ()
{
    console.log('open db');
})



//middleware for bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));




//express-validator

 //middleware for express-expressValidator
 // Express Validator Middleware
 app.use(validator({
   errorFormatter: function(param, msg, value) {
       var namespace = param.split('.')
       , root    = namespace.shift()
       , formParam = root;

     while(namespace.length) {
       formParam += '[' + namespace.shift() + ']';
     }
     return {
       param : formParam,
       msg   : msg,
       value : value
     };
   }
 }));



//middleware for passport
app.use(passport.initialize());
app.use(passport.session());



app.use(cors());

//port no
var portNo= process.env.PORT|| 8080;

//calling productRoutes
productRoutes(app);


//setting express static files
app.use(express.static(path.join(__dirname, 'cartApp/dist/cartApp')));


app.get('*',function(request,response)
{
  console.log('get * method');
  response.sendFile(path.join(__dirname,'cartApp/dist/cartApp/index.html'));
})







app.listen(portNo);

console.log('server listen to the port no'+portNo);
