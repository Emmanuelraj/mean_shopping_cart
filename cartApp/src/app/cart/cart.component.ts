import { Component, OnInit } from '@angular/core';
import {CartService} from './../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers : [CartService]
})
export class CartComponent implements OnInit {


products =[]
  constructor(private cartService : CartService) { }




  ngOnInit() {
    this.cartService.getProducts()
   .subscribe(
     (res) => this.products = res,
     (err) => console.log(err)
   )
  }


  




}
