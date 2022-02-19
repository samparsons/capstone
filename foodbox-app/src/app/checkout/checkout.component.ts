import { Component, OnInit } from '@angular/core';
import { InternalService } from '../service/data/internal.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart:any = [];
  cartDetails:any = [];
  cartValue:any = [];
  total:number=0;
  cartNumber:number=0;
  show:boolean=false;
  cartCount:number = 0;
  firstName:string = "";
  checkout: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    address2: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
    country: new FormControl(''),
    saveInfo: new FormControl(''),
    paymentMethod: new FormControl(''),
    ccName: new FormControl(''),
    ccNumber: new FormControl(''),
    ccExpiration: new FormControl(''),
    ccCvv: new FormControl('')
  })
  submitted = false;

  constructor(
    private internal:InternalService,
    private fb: FormBuilder,
    private router : Router) {
    this.internal.cartSubject.subscribe((data)=>{
      this.cartCount = data;
    });
   }

  ngOnInit(): void {
    this.getCartData();
    this.cartTotal();
    this.cartNumberFunc();
    this.checkout = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      saveInfo: [''],
      paymentMethod: ['', Validators.required],
      ccName: ['', Validators.required],
      ccNumber: ['', Validators.required],
      ccExpiration: ['', Validators.required],
      ccCvv: ['', Validators.required],
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.checkout.controls;
  }
  


  getCartData(): void {
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

  cartTotal(): void {
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

  cartNumberFunc(): void {
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

  onSubmit(checkout:any): void {
    this.submitted = true;
    
    if (this.checkout.invalid) {
      return;
    } else {
      localStorage.setItem('checkout',JSON.stringify(checkout.value));
      this.router.navigate(['/pmtConfirm']);
    }
    console.log(JSON.stringify(this.checkout.value, null, 2));

  }

  

}
