import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';

import {Router} from '@angular/router';

import {Http,Response,Headers,RequestOptions} from '@angular/http';


import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';




@Injectable()
export class AuthService {

  constructor(private http:HttpClient, private router : Router, private httpRoute: Http) { }



  private _getUrl ='http://localhost:8080/api/register';


  private _loginUrl = 'http://localhost:8080/api/login';



  private _getPwdUrl = 'http://localhost:8080/api/cpwd/';

  //profile
   private _accessUrl = 'http://localhost:8080/api/access/';



  getRegister(user)
  {
    return this.http.post<any>(this._getUrl,user);//Observable
  }



  getLogin(user)
   {
     //set the username in localStorage
     console.log('username'+user.username);
     localStorage.setItem('username',user.username);

     return this.http.post<any>(this._loginUrl,user)//Observable

   }






   getConfirmPassword(user)
   {
     console.log('cpwd'+user);
    // return this.http.post<any>(this.)
     let headers = new Headers({'Content-Type':'application/json'})

     let options = new RequestOptions({headers : headers});

     return this.httpRoute.get(this._getPwdUrl+user)
        .map((response:Response)=>response.json())

   }




    loggedIn()
     {
       return !!localStorage.getItem('token');
     }




  loggedOut()
  {

    this.router.navigate(['/cart']);
    localStorage.removeItem('username');
  //  localStorage.removeItem(this.username);
    return localStorage.removeItem('token');
  }









    getByUserName(username)
    {
      console.log('getByUserName'+username);

       let headers = new Headers({'Content-Type':'application/json'})

       let options = new RequestOptions({headers:headers});


       return this.httpRoute.get(this._accessUrl+username)
       .map((response:Response) => response.json());
    }




}
