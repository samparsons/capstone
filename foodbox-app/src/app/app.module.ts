//Angular Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';

//Angular Materials
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//3rd Party
import { Ng2SearchPipeModule } from 'ng2-search-filter';


//Local Components
import { HomeComponent } from './home/home.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentConfirmComponent } from './payment-confirm/payment-confirm.component';
import { ShopComponent } from './shop/shop.component';
import { AccountDashComponent } from './account-dash/account-dash.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminDashComponent,
    AdminLoginComponent,
    NavComponent,
    FooterComponent,
    SignupComponent,
    CartComponent,
    CheckoutComponent,
    PaymentConfirmComponent,
    ShopComponent,
    AccountDashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
