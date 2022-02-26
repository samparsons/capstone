import { Component, OnInit } from '@angular/core';
import { InternalService } from '../service/data/internal.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroceryService } from '../service/data/grocery.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart:any = [];
  cartDetails:any = [];
  cartValue:any = [];
  authUser:any = [];
  user:any = [];
  names:any = [];
  address:any=[];
  total:number=0;
  cartNumber:number=0;
  show:boolean=false;
  cartCount:number = 0;
  firstName:string = "";
  loginHelpMessage:string='';
  res:any=[];
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
    private router : Router,
    private api: GroceryService) {
    this.internal.cartSubject.subscribe((data)=>{
      this.cartCount = data;
    });
    this.internal.loginHelpMessage.subscribe((data)=>{
      this.loginHelpMessage = data;
    });
   }

  ngOnInit(): void {
    this.authUser = localStorage.getItem('authUser');
    this.user = JSON.parse(this.authUser);
    if(this.user===null){
      this.router.navigate(['login']);
    }
    this.names = this.user.name.split(' ');
    this.address = this.user.address.split(', ');
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

  buildLocalTransactions(checkout:any){
    let currentTime = new Date();
    let month = currentTime.getMonth() + 1;
    let day = currentTime.getDate();
    let year = currentTime.getFullYear();
    let hour = currentTime.getHours();
    let min = currentTime.getMinutes();

    let transactionTotal = {
      "userid" : this.user.id,
      "totalprice" : this.total,
      "paymentmethod" : checkout.paymentMethod,
      "transactiondate": month +'/'+ day + '/' + year,
      "deliverydate" : month +'/'+ (day+1) + '/' + year,
      "deliverytime" :  hour + ':' + min
    };
    let id:number = 0;
    this.api.addTransactionTotal(transactionTotal)
      .subscribe(
        (data)=>{
          id = data.id;
          if(localStorage.getItem('localCart')){
            let cartTemp = localStorage.getItem('localCart');
            if(cartTemp === null) {
              //do nothing
            } else {
              this.cartDetails = JSON.parse(cartTemp);
              for(let cartItem of this.cartDetails){
    
                let transactionDetail = {
                  "transactionid":id,
                  "userid":this.user.id,
                  "menuid":cartItem.id,
                  "quantity":cartItem.qty
                };
                
                this.api.addTransactionDetail(transactionDetail)
                  .subscribe(
                    (data)=>{
                    },
                    (error: any) => console.log(error));
                }
              }
            }
        },
        (error: any) => console.log(error));
      
  }


  onSubmit(checkout:any): void {
    this.submitted = true;
    
    if (this.checkout.invalid) {
      return;
    } else {
      
      localStorage.setItem('checkout',JSON.stringify(checkout.value));
      this.buildLocalTransactions(checkout.value)
      this.router.navigate(['/pmtConfirm']);
    }
    //console.log(JSON.stringify(this.checkout.value, null, 2));

  }

  

}
