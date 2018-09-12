import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './auth.guard';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : '/cart',
    pathMatch : 'full'
  },
  {
    path : 'cart',
    component:CartComponent
  },
  {
    path :'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'profile',
    component:ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'add-to-cart',
    component:ShoppingCartComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
