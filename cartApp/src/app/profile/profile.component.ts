import { Component, OnInit } from '@angular/core';
import {AuthService} from './../auth.service';
import {CartService} from './../cart.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[AuthService]
})
export class ProfileComponent implements OnInit {

  products =[];
  constructor(private authService:AuthService, private cartService: CartService)
  {
    this.username =   localStorage.getItem('username');
//    localStorage.removeItem(this.username);
    this.cartTotalQty=   localStorage.getItem(this.username);//add specified cart product value after log

    alert('Total Products in cart'+this.cartTotalQty)
     if(this.cartTotalQty===0)
     {
       this.cartTotalQty = 0;
     }
     else
      {
         this.cartTotalQty;
         alert('Total Products in cart'+this.cartTotalQty)

      }



   }


  UserDetails:any={};


  ProductsDetails:any={};


  username:string;


   prodId:string;

  viewBtn:boolean = false;


  criteriaButton:boolean = false;


  addBtn:boolean = false;


  warningForm:boolean = false;

  //viewProducts:boolean = false;

  isAdmin = false;


  editForm:boolean = false;




  cartTotalQty:any;



//  cartTotalQty:number = 0;

cartTotalQuantity:any = {}




  ngOnInit() {
    console.log('init method');
    this.username =   localStorage.getItem('username');

        console.log(this.username);
    this.authService.getByUserName(this.username)
      .subscribe((res)=> this.UserDetails = res,
        (err)=> console.log(err));

      this.cartService.getProducts()
       .subscribe(
         (res) => this.products = res,
        (err) => console.log(err))


    }




    viewUser()
     {
       console.log('viewUser')
          this.viewBtn=true;
           document.getElementById("viewProducts").style.visibility ="hidden";
     }



     onClickUserName(user)
      {
        console.log('user'+user);

        console.log('user'+this.UserDetails.user);

        if(this.UserDetails.user ==='Admin')
         {
            console.log('admin')
        //this.editBtn = true;
              //this.deleteBtn = true;
              this.criteriaButton = true;
              this.isAdmin = true;
         }

      }

           add()

           {
             console.log('addBtn method')
             document.getElementById("viewForm").style.visibility ="hidden";
             document.getElementById("alertForm").style.visibility ="hidden";
             this.addBtn = true;
             //document.getElementById("viewProducts").style.visibility ="hidden";
           }



           delete(id)
            {
              console.log('delete method'+id);
              var productId = prompt("Please enter your name", id);
                if (productId != null)
                 {

                      this.cartService.deleteProduct(productId)
                        .subscribe(
                          (res)=> console.log(res),
                        (err)=> console.log(err)
                       )

                       this.warningForm = true;

                         document.getElementById("alertForm").style.visibility ="hidden";
                }
            }




            addProducts()
            {
                console.log('addProducts method'+this.ProductsDetails);

                this.cartService.addProduct(this.ProductsDetails)
                  .subscribe(
                    (res) => console.log(res)
                  ,
                    (err)=> console.log(err)
                  )}


              edit(productId)
               {
                 console.log('id'+productId);
                 this.prodId= productId;
                 this.editForm = true;

               }


               updateProduct()
               {
                 console.log('updateProduct')
                 this.ProductsDetails._id=this.prodId;
                  this.cartService.editProduct(this.ProductsDetails)
                    .subscribe(
                      (res) => console.log(res),
                      (err) => console.log(err))
               }


               addToCart(product)
               {
                 console.log('id'+product._id+'imagepath'+product.imagepath+'title'+product.title);
                 this.cartTotalQty++;
                 this.cartTotalQuantity.qty = this.cartTotalQty;
                 alert(this.cartTotalQuantity.qty)
                 //vvi  --->very very important
                 localStorage.setItem(this.username,this.cartTotalQuantity.qty);//add specified cart product value after log
                  this.cartTotalQuantity.id = product._id;//id setted

                 var user = localStorage.getItem('username');
                 var title = product.title;

                 console.log('user'+user);

                 //setting the value
                  this.cartTotalQuantity.username =  user
                  this.cartTotalQuantity.imagepath = product.imagepath;
                  this.cartTotalQuantity.title = title;
                  this.cartTotalQuantity.description  = product.description;
                  this.cartTotalQuantity.price  = product.price;

                  this.cartService.addToCart(this.cartTotalQuantity)
                  .subscribe((res)=> console.log(res),
                  (err)=> console.log(err));



               }


}
