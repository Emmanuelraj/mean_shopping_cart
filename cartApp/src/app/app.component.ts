import { Component,Input } from '@angular/core';

import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[AuthService]
})
export class AppComponent {
  title = 'cartApp';

//  @Input() cartTotalQuantity;

    constructor(private authService: AuthService)
     {}


    loggedOut()
     {
       localStorage.removeItem('username');
     }



}
