import { Component, OnInit ,Input} from '@angular/core';
import {CartService} from './../cart.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers:[CartService]
})
export class ShoppingCartComponent implements OnInit {

  @Input() cartTotalQuantity;

  cartProduct = [];


  viewPurchase =[];

  totalQty:number;

  orderProduct=[];


  constructor(private cartService:CartService) { }


  username: string;


  purchaseOrder:any ={};


  viewPurchaseOrders:boolean=false;


  ngOnInit() {
    this.username =   localStorage.getItem('username');
  //  localStorage.removeItem(this.username);
    this.cartService.viewaddedCartproducts(this.username)
     .subscribe((res) => this.cartProduct =res,
        (err) => console.log(err))

      console.log('length'+this.cartProduct.length);

  }
 /**
 The concept is to fetch the add
 then the products should be deleted addCarts
 */
   purchaseOrderWithName(product)
    {
      console.log('addPurchaseOrderWithName  id ------------->'+product.id);
       this.purchaseOrder.username = this.username;
       this.purchaseOrder.productId = product._id;
       this.purchaseOrder.imagepath = product.imagepath;
       this.purchaseOrder.description = product.description;
       this.purchaseOrder.title = product.title;
       this.purchaseOrder.price = product.price;

       console.log('uname'+this.purchaseOrder.username+'id'+this.purchaseOrder.id);


       this.cartService.addPurchaseOrderWithName(this.purchaseOrder)
        .subscribe((res)=> console.log(res),
          (err)=> console.log(err));

          this.cartService.deletePurchasedOrder(this.purchaseOrder.productId)
            .subscribe((res)=>  console.log(res),
          (err)=> console.log(err))
    }


  submit(id)
   {
     console.log('id'+id)
   }



   viewOrders()
    {
        console.log('viewOrders');
        this.viewPurchaseOrders = true;
        this.username =   localStorage.getItem('username');
        this.cartService.viewPurchaseOrder(this.username)
        .subscribe((res)=>  this.orderProduct = res,
        (err)=>console.log(err)  )
    }







}
