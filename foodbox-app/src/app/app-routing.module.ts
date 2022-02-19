import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: '',
    component: HomeComponent
  },
  { path: 'home',
    component: HomeComponent
  },
  { path: 'shop',
    component: ShopComponent
  },
  { path: 'cart',
    component: CartComponent
  },
  { path: 'checkout',
    component: CheckoutComponent
  },
  { path: 'pmtConfirm',
    component: PaymentConfirmComponent
  },
  { path: 'admin',
    component: AdminLoginComponent
  },
  { path: 'admin-dash/:id',
    component: AdminDashComponent
  },
  { path: 'signup',
    component: SignupComponent
  },
  { path: '**',
    component: HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
