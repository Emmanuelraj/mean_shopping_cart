import { Component, OnInit } from '@angular/core';

import {User} from './../user';

import {AuthService} from './../auth.service';

import {Router} from '@angular/router';


const users:User[]=[
    {  "name":"Admin"},
    {  "name":"User"}
];



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers :[AuthService]
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService, private router :Router) { }

  ngOnInit() {



  }

   users = users;
  registeredUserData:any ={};



  onSubmit()
  {
    console.log('onSubmit'+this.registeredUserData);
    if(this.registeredUserData.user === undefined)
     {
       alert('please select the user');
     }


     else  if(this.registeredUserData.user === 'Admin')
     {
         alert('admin mode');
          console.log('admin mode')

        this.authService.getRegister(this.registeredUserData)
        .subscribe(

          res=> console.log(res),
          //this.router.navigate(['/login'])
       
          err => console.log(err)
        )
     }

     else  if(this.registeredUserData.user === 'User')
     {
         alert('User mode');
          console.log('admin mode')

        this.authService.getRegister(this.registeredUserData)
        .subscribe(
          res=> console.log(res),
          err => console.log(err)
        )
     }
  else
  {
       alert('please select a mode');
  }


    }





  onClickUser(user)
   {
     console.log('onClickUser'+user);
     this.registeredUserData.user = user;
     console.log('user'+this.registeredUserData.user);
   }

}
