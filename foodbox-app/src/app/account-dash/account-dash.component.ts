import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroceryService } from '../service/data/grocery.service';
import { InternalService } from '../service/data/internal.service';
import { UserService } from '../service/data/user.service';

@Component({
  selector: 'app-account-dash',
  templateUrl: './account-dash.component.html',
  styleUrls: ['./account-dash.component.css']
})
export class AccountDashComponent implements OnInit {
  authUser:any=[];
  user:any;
  showTransactions:boolean=false;
  showAccount:boolean=false;
  transactionList:any=[];
  control:string='';
  cartCount:number=0;
  authStatus:boolean=false;

  constructor(
    private apiGrocery:GroceryService,
    // keep UserService here bc you will use this if you make the account details editable.
    private apiUser:UserService,
    private internal: InternalService,
    private router : Router) {
      this.internal.cartSubject.subscribe((data)=>{
        this.cartCount = data;
      });
      console.log(this.cartCount);
      this.internal.authSubject.subscribe((data)=>{
        this.authStatus = data;
      });
    }

  ngOnInit(): void {
   
    this.cartNumberFunc();
    this.authUser = localStorage.getItem('authUser');
    if(this.authUser!==null){
      this.internal.authSubject.next(true);
      this.user = JSON.parse(this.authUser);
      this.getTransactionTotalsByUser(this.user.id);
    }
    console.log(this.authStatus);
    if(!this.authStatus){
      this.router.navigate(['home']);
    }
    
  }

  getTransactionTotalsByUser(id:number){
    this.apiGrocery.getTransactionTotalsByUser(id)
      .subscribe(res=>{
        this.transactionList = res;
      });
    //localStorage.setItem('localTransactions',JSON.stringify(this.transactionList));
  }

  handleProceedToCheckout(){
    this.router.navigate(['checkout']);
  }

  handleLogout(){
    localStorage.clear();
    this.internal.authSubject.next(false);
    this.internal.authMessage.next('Login');
    this.internal.adminBool.next(false);
    this.router.navigate(['home']);
  }

  toggle(control:string){
    if(control==='a'){
      if(!this.showAccount){
        this.showAccount = !this.showAccount;
        this.showTransactions = !this.showAccount;
      }
    }
    if(control==='t'){
      this.showTransactions = !this.showTransactions;
      this.showAccount = !this.showTransactions;
    }
    if(control==='hideall'){
      this.showAccount = false;
      this.showTransactions = false;
    }
  }

  cartValue:any=[];
  cartNumber:number=0;
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




