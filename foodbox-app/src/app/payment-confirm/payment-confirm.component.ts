import { Component, OnInit } from '@angular/core';
import { InternalService } from '../service/data/internal.service';

@Component({
  selector: 'app-payment-confirm',
  templateUrl: './payment-confirm.component.html',
  styleUrls: ['./payment-confirm.component.css']
})
export class PaymentConfirmComponent implements OnInit {
  cart:any = [];
  checkout:any = [];
  cartDataPresent:boolean=false;
  checkoutDataPresent:boolean=false;
  show:boolean=false;
  total:number=0;
  cartNumber:number=0;
  shop:any;

  constructor(private internal:InternalService) { }

  ngOnInit(): void {
    this.getCartData();
    this.getCheckoutData();
    this.cartTotal();
    this.showContent();
    this.cartNumberFunc();
    localStorage.removeItem('localCart');
    this.internal.cartSubject.next(0);
  }

  getCartData(){
    let cartData = localStorage.getItem('localCart');
    if(cartData===null){
      this.cart = [];
      this.cartDataPresent = false;
      
    } else {
      this.cart = JSON.parse(cartData);
      this.cartDataPresent = true;
      
    }
  }

  getCheckoutData(){
    let checkoutData = localStorage.getItem('checkout');
    if(checkoutData===null){
      this.checkout = [];
      this.checkoutDataPresent = false;
    } else {
      this.checkout = JSON.parse(checkoutData);
      this.checkoutDataPresent = true;
    }
  }

  cartTotal(): void {
    if(localStorage.getItem('localCart')){
      let cartTemp = localStorage.getItem('localCart');
      if(cartTemp === null) {
        //do nothing
      } else {
        this.cart = JSON.parse(cartTemp);
        this.total = 0;
        for(let cartItem of this.cart){
          this.total += parseFloat(cartItem.subtotal);
        }
      }
    }
  }

  cartNumberFunc(): void {
    this.cart = localStorage.getItem('localCart');
    if(this.cart === null){
      this.cartNumber = 0;
    } else {
      this.cart = JSON.parse(this.cart);
      if(this.cart === null){
        this.cartNumber = 0;
      } else {
        this.cartNumber=0;
        for(let cartItem of this.cart){
          this.cartNumber += cartItem.qty;
        }
      }
    }
    this.internal.cartSubject.next(this.cartNumber);
  }

  showContent() {
    if(this.checkoutDataPresent&&this.cartDataPresent){
      this.show = true;
      this.internal.showSubject.next(this.show);
    } else {
      this.show = false;
      this.internal.showSubject.next(this.show);
    }
  }

}
