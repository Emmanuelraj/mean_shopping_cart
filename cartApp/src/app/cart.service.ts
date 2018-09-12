import { Injectable } from '@angular/core';
import {HttpClient}  from '@angular/common/http';
import {Router} from '@angular/router';
import {Http,Response,Headers,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CartService {

  constructor(private http:HttpClient, private router:Router, private httpRoute:Http) { }

  private _getUrl ='http://localhost:8080/api/products';
  private _deleteUrl ='http://localhost:8080/api/deleteByIdProduct/';
  private _addProductUrl = 'http://localhost:8080/api/addProducts';
  private _editProductUrl ='http://localhost:8080/api/editProduct/';
  private _addTocartUrl = 'http://localhost:8080/api/addToCart';
  private _addedCartUrl = 'http://localhost:8080/api/addedCart/';
  private _viewAddCartUrl ='http://localhost:8080/api/add-to-cart/';
  private _purchaseOrderUrl ='http://localhost:8080/api/purchaseOrder';
  private _deleteBuyedProductsUrl ='http://localhost:8080/api/deletePurchaseOrder/';
  private _viewPurchasedProductUrl='http://localhost:8080/api/viewPurchaseOrder/';

  getProducts()
   {
     return this.http.get<any>(this._getUrl);
   }


   deleteProduct(id)
    {
       return this.httpRoute.delete(this._deleteUrl+id)
         .map((response:Response) =>response.json());

    }



    addProduct(product)
     {
               return this.http.post<any>(this._addProductUrl,product);  //Observable
     }


   editProduct(product)
     {
       console.log('edit'+product._id);
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions({headers :headers});
        return this.httpRoute.put(this._editProductUrl+product._id,JSON.stringify(product),options)
        .map((response:Response) =>response.json());
     }

     addToCart(product)
      {
        console.log('add-to-cart method'+product.username)

        return this.http.post<any>(this._addTocartUrl,product); //Observable
      }



      //addedProducts  ---->
      viewaddedCartproducts(username)
       {
         console.log('username'+username);

         return this.httpRoute.get(this._viewAddCartUrl+username)
         .map((response : Response) => response.json());

       }



      addPurchaseOrderWithName(product)
      {

        console.log('addPurchaseOrderWithName service method');
        return this.http.post<any>(this._purchaseOrderUrl,product);
      }
     deletePurchasedOrder(productId)
     {
       console.log('deleting the purchasedOrder');

        return this.httpRoute.delete(this._deleteBuyedProductsUrl+productId)
        .map((response:Response)=> response.json());
     }


     viewPurchaseOrder(username)
      {
        console.log('viewPurchaseOrder'+username);
        return this.httpRoute.get(this._viewPurchasedProductUrl+username)
        .map((response : Response) => response.json());
      }





}
