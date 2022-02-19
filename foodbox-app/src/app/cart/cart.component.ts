import { Component, OnInit } from '@angular/core';
import { InternalService } from '../service/data/internal.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart:any = [];
  cartDetails:any = [];
  cartValue:any = [];
  total:number=0;
  cartNumber:number=0;
  show:boolean=false;
  constructor(private internal:InternalService) { }

  ngOnInit(): void {
    this.getCartData();
    this.cartTotal();
    this.cartNumberFunc();
  }

  getCartData(){
    let cartData = localStorage.getItem('localCart');
    if(cartData===null){
      this.cart = [];
      this.show = false;
      this.internal.showSubject.next(this.show);
    } else {
      this.cart = JSON.parse(cartData);
      this.show = true;
      this.internal.showSubject.next(this.show);
    }
  }

  inc(grocery:any){
    grocery.qty++;
    grocery.subtotal = grocery.qty*grocery.price;
    grocery.subtotal = Number.parseFloat(grocery.subtotal).toFixed(2);
    localStorage.setItem('localCart', JSON.stringify(this.cart));
    this.cartTotal();
    this.cartNumberFunc();
    return grocery.qty

  }

  dec(grocery:any){
    if(grocery.qty>0){
      grocery.qty--;
      grocery.subtotal = grocery.qty*grocery.price;
      grocery.subtotal = Number.parseFloat(grocery.subtotal).toFixed(2);
    } else {
      grocery.qty = 0;
      grocery.subtotal = 0;
      grocery.subtotal.toFixed(2);
    }
    localStorage.setItem('localCart', JSON.stringify(this.cart));
    this.cartTotal();
    this.cartNumberFunc();
    return grocery.qty;
  }

  cartTotal(){
    if(localStorage.getItem('localCart')){
      let cartTemp = localStorage.getItem('localCart');
      if(cartTemp === null) {
        //do nothing
      } else {
        this.cartDetails = JSON.parse(cartTemp);
        this.total = 0;
        for(let cartItem of this.cartDetails){
          this.total += parseFloat(cartItem.subtotal);
        }
      }
    }
  }

  removeall(){
    localStorage.removeItem('localCart');
    this.getCartData();
    this.cartNumberFunc();
    this.total = 0;
  }

  singleDelete(id:any){
    if(localStorage.getItem('localCart')){
      let cartTemp = localStorage.getItem('localCart');
      if(cartTemp === null) {
        //do nothing
      } else {
        this.cartDetails = JSON.parse(cartTemp);
        for(let i=0;i<this.cartDetails.length;i++){
          if(this.cartDetails[i].id === id){
            this.cartDetails.splice(i,1);
            localStorage.setItem('localCart', JSON.stringify(this.cartDetails));
          }
        }
      }
    }
    this.getCartData();
    this.cartNumberFunc();
  }

  
  cartNumberFunc(){
    this.cartValue = localStorage.getItem('localCart');
    if(this.cartValue === null){
      this.cartNumber = 0;
    } else {
      this.cartValue = JSON.parse(this.cartValue);
      if(this.cartValue === null){
        this.cartNumber = 0;
      } else {
        this.cartNumber=0;
        for(let cartItem of this.cartValue){
          this.cartNumber += cartItem.qty;
        }
      }
    }
    this.internal.cartSubject.next(this.cartNumber);
  }

}
