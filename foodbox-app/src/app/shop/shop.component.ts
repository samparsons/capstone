import { GroceryService } from '../service/data/grocery.service';
import { Component, OnInit } from '@angular/core';
import { InternalService } from '../service/data/internal.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  public groceryList : any;
  grocery : string = '';
  search : string = '';
  itemsCart:any = [];
  cartValue:any = [];


  constructor(
    private api:GroceryService,
    private internal:InternalService
  ) { }
  

  ngOnInit(): void {
    this.api.getGrocery()
    .subscribe(res=>{
      this.groceryList = res;
      for(let grocery of this.groceryList){
        grocery['qty'] = 1;
        grocery['subtotal'] = grocery.price;
      }
    })
  }

  inc(grocery:any){
    grocery.qty++;
    grocery.subtotal = grocery.qty*grocery.price;
    grocery.subtotal = Number.parseFloat(grocery.subtotal).toFixed(2);
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
    }
    return grocery.qty;
  }

  addCart(grocery:any){
    let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull === null){
      let storeDataGet:any = [];
      storeDataGet.push(grocery);
      localStorage.setItem('localCart',JSON.stringify(storeDataGet));
    } else {
      var id = grocery.id;
      let index:number = -1;
      this.itemsCart = JSON.parse(cartDataNull);
      for(let i=0;i<this.itemsCart.length;i++){
        if(parseInt(id) === parseInt(this.itemsCart[i].id)){
          this.itemsCart[i].qty = grocery.qty;
          this.itemsCart[i].subtotal = grocery.subtotal;
          index = i;
          break;
        }
      }
      if(index == -1){
        this.itemsCart.push(grocery)
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      } else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumberFunc();
  }

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
