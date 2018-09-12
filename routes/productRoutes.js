module.exports = function (app)
{

    const Product = require('../models/products');
   const User = require('../models/user');
   const bcrypt = require('bcryptjs');
   const LocalStrategy = require('passport-local').Strategy;
   const passport = require('passport');
   const jwt = require('jsonwebtoken');

  const addCart = require('../models/addCart');

  const purchaseOrder = require('../models/purchaseOrder');




  app.get('/api/products',function (request,response)
  {
      console.log('get products');

      Product.find({},function (err, products)
       {
           if(err)
            {
              console.log(err);
            }
            else {
              response.json(products);
            }

      })

  })


  //register post method
  app.post('/api/register',function (request,response) {



    console.log('register post method'+request.body.username);

         var username = request.body.username;

        var password = request.body.password;

        var confirmPassword = request.body.confirmPassword;

        var user = request.body.user;


        request.checkBody('username','username is required').notEmpty();
        request.checkBody('password','password is required').notEmpty();
        request.checkBody('confirmPassword','password is not match').equals(request.body.password)
        request.checkBody('user','user is required').notEmpty();



        const errors = request.validationErrors();

        if(errors)
          {
            console.log('err'+errors);
            response.send(errors)
          }

          else {

            var userModel = new User({
                  username : username,
                  password: password,
                  confirmPassword : confirmPassword,
                  user:user
            })

                      bcrypt.genSalt(10, function(err, salt) {
                         bcrypt.hash(password, salt, function(err, hash) {
                             // Store hash in your password DB.

                             userModel.password =hash;
                             userModel.save(function (err,userregs)
                             {
                               if(err)
                                 {
                                   console.log('err'+err);
                                 }
                                else {
                                         response.send('inserted'+userregs);
                                     }

                             })
                         })
                     })
          }

     })

         app.post('/api/login',function (request,response,next)
         {
           console.log('login method');
           console.log('passport');
          // Local Strategy
          passport.use(new LocalStrategy(function(username, password, done){
           console.log('uname'+username);
            // Match Username
            let query = {username:username};

            //find the username in mlab registers collections
            User.findOne(query, function(err, user){
              if(err) throw err;
              if(!user){


            console.log('user method')
                //return done(null, false, {message: 'No user found'});

              //return response.json({success: false, msg:'Failed to register'})

            return  response.status(401).send('Invalid crediatianls');
              }
              // Match Password
              bcrypt.compare(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch)
                {
                  console.log('isMatch'+isMatch);
                  //return done(null, user);
                  let payload ={subject: user._id}
                  let token =jwt.sign(payload,'secretkey')
                  response.status(200).send({token})
                }

                else
                 {
                    console.log('Wrong password');
                  //return done(null, false, {message: 'Wrong password'});

                  //return response.json({success, msg; 'Wrong password'});
                  response.status(401).send('Wrong password')

                }
              });
            });
          }));

          passport.serializeUser(function(user, done) {
            done(null, user.id);
          });

          passport.deserializeUser(function(id, done)
          {
            User.findById(id, function(err, user)
            {
              done(err, user);
            });
          });



            console.log('login post method');
              let userData = request.body

             passport.authenticate('local')(request,response,next)
         });



      app.get('/api/access/:username',function(request,response)
      {

        console.log('username method'+request.params.username);


          var  username = request.params.username;

            User.findOne({username:username},function(err,user)
            {

                if(err)
                  {
                    console.log('err'+err);
                    response.status(400)

                  }
                  else {
                    console.log(user);
                    response.json(user);
                  }

            })

      })


        app.post('/api/addProducts',function (request,response)
        {
            console.log('addProducts method');
             new Product({
                imagepath: request.body.imagepath,
                 title: request.body.title,
                 description:request.body.description,
                 price:request.body.price
             }).save(function (err,products)
             {
               if(err)
                {
                  console.log('err add db'+err);
                }
                else {
                      response.json(products)
                }

             })

        })




      //update
      app.put('/api/editProduct/:id',function (request,response)
      {
         console.log('editProducts');
         Product.findByIdAndUpdate(request.params.id,
         {
           $set:{
             imagepath: request.body.imagepath,
              title: request.body.title,
              description:request.body.description,
              price:request.body.price
           }},
           {
             //if it is false revert into exist record
             //if it is true update the record
             new:true
           },
            function (err,updatedProduct)
            {
              if(err)
               {
                 console.log('err'+err);
               }
                 else {
                   console.log(updatedProduct);
                 }
            })
      });


          //delete findById
          app.delete('/api/deleteByIdProduct/:id',function(request,response)
          {

            console.log('delete by Id');

            Product.remove({_id:request.params.id},function (err,removedTask)
            {

              if(err)
               {
                 console.log('err'+err);
               }
               else {
                 response.send('deleteProducts')
               }

            })
          })


          app.get('/api/productById/:id',function (request,response)
          {

            console.log('fetch productById');

            Product.findById({_id:request.params.id},function (err, product)
            {
                if(err)
                 {
                    console.log('err on db'+err);
                 }
                 else {
                    response.json(product)
                 }

            })

          })




          app.post('/api/addToCart',function (request,response)
          {
              console.log('add-to-cart method');

              new addCart({
                  username:request.body.username,
                imagepath: request.body.imagepath,
                 title: request.body.title,
                 description:request.body.description,
                 price:request.body.price

              }).save(function (err,addProducts)
              {
                 if(err)
                  {
                    console.log('err'+err);
                  }
                  else {
                         response.json(addProducts)
                  }

              })

          })




         /**
          *   add-to-cart by username
         */
          app.get('/api/add-to-cart/:username',function (request,response)
          {
              console.log('added products By Id fetch'+request.params.username);
                 addCart.find({username:request.params.username},function (err,cart)
                 {
                     if(err)
                      {
                           console.log('err on db'+err);
                      }
                      else
                      {
                        console.log('product'+cart);
                           response.json(cart)
                      }
                 })
          })




//add db purchase into db

          app.post('/api/purchaseOrder', function (request,response)
          {
              console.log('purchaseOrder');

              new purchaseOrder({
                username:request.body.username,
                productId:request.body.productId,
                imagepath:request.body.imagepath,
                description:request.body.description,
                title:request.body.title,
                  price:request.body.price
              }).save(function (err, purchaseOrder)
              {
                 if(err)
                    {
                        console.log('err'+err);
                    }
                  else {
                      console.log(purchaseOrder);
                      response.json(purchaseOrder);
                  }

              })

          })



     app.delete('/api/deletePurchaseOrder/:productId',function (request,response)
     {
         console.log('deletePurchaseOrder by productId'+request.params.productId);
             addCart.remove({_id:request.params.productId},function (err, deletePurchaseOrder)
             {
                 if(err)
                  {
                    console.log('err'+err)
                  }
                  else {
                    response.send('deleted Buying products')
                  }
             })
       })




    app.get('/api/viewPurchaseOrder/:username',function (request,response)
    {
      console.log('post method');
        purchaseOrder.find({username:request.params.username},function (err,cart)
        {
           if(err)
            {
              console.log('err'+err);
            }
            else {
              console.log('cart'+cart);
              response.json(cart)
            }

        })
    });

}
