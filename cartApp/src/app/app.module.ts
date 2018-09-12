import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';

import{AuthService} from './auth.service';
import {CartService} from './cart.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {User} from './user';
import {FormsModule} from  '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import {AuthGuard} from './auth.guard';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule

  ],
  providers: [CartService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
