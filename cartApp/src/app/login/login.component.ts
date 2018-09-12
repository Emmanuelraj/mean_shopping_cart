import { Component, OnInit } from '@angular/core';

import {AuthService} from './../auth.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {
  }



  loginUserData:any={};

  loginFailMsg:boolean = false;

  pwd:any={};

  login()
  {
    console.log('login method'+this.loginUserData);
    return this.authService.getLogin(this.loginUserData)
    .subscribe(
      (res)=>{
         console.log(res),
         localStorage.setItem('token',res.token),
         this.router.navigate(['/profile'])
      },
      (err) => console.log('err'+err)

    )
  }





  forgotPwd()
  {
    console.log('forgotPwd method')

    var username = prompt("Enter your username");


//fetch the username cpwd
    if(username!=null)
     {
    alert('uname'+this.pwd)

     return  this.authService.getConfirmPassword(username)
     .subscribe((res)=>this.pwd=res,
     (err) => console.log(err));
     }
  }



}
